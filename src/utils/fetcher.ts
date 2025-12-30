import axios from "axios"

import validateJsonFormat from "./validateJsonFormat"

const fetcher = async <T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  const normalizedHeaders = init?.headers
    ? init.headers instanceof Headers
      ? Object.fromEntries(init.headers.entries())
      : Array.isArray(init.headers)
      ? Object.fromEntries(init.headers)
      : init.headers
    : undefined

  const response = await axios.request<T>({
    url: typeof input === "string" ? input : input.url,
    method: init?.method || "GET",
    headers: normalizedHeaders,
    data: init?.body,
    responseType: "json",
  })

  const contentType = response.headers["content-type"] || ""
  if (!validateJsonFormat(contentType)) {
    throw new Error(
      `Invalid content type: expected JSON but received "${contentType}"`
    )
  }

  return response.data
}

export default fetcher
