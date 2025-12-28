import validateJsonFormat from "./validateJsonFormat"

async function fetcher<T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  })

  if (!res.ok) {
    let body: unknown
    try {
      body = await res.json()
    } catch {
      body = await res.text()
    }
    const err: Error & { status?: number; info?: unknown } = new Error(
      `Request failed with status ${res.status}`
    )
    err.status = res.status
    err.info = body
    throw err
  }

  const contentType = res.headers.get("content-type") ?? ""
  const isJson = validateJsonFormat(contentType)
  if (!isJson) {
    throw new Error(
      `Expected JSON response but got content-type: ${contentType || "none"}`
    )
  }

  return res.json() as Promise<T>
}

export default fetcher
