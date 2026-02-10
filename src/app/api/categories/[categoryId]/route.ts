import { NextResponse } from "next/server"

import { apiBaseUrl } from "@/constants/app"

interface RouteParams {
  params: {
    categoryId: string
  }
}

const categoriesEndpoint = `${apiBaseUrl}/categories`

const readJsonSafely = async (response: Response) => {
  const contentType = response.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return response.json()
  }
  return null
}

const forwardMutation = async (
  categoryId: string,
  method: "PUT" | "PATCH" | "DELETE",
  body?: unknown
) => {
  try {
    const response = await fetch(`${categoriesEndpoint}/${categoryId}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    })

    const responseBody = await readJsonSafely(response)

    if (!response.ok) {
      console.error(
        `Failed to ${method.toLowerCase()} category ${categoryId}:`,
        response.statusText
      )
      return NextResponse.json(
        responseBody ?? { error: response.statusText },
        { status: response.status }
      )
    }

    return NextResponse.json(responseBody ?? { success: true })
  } catch (error) {
    console.error(`Error while executing ${method} for category:`, error)
    return NextResponse.json(
      { error: `Unexpected error while processing category ${categoryId}` },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  const payload = await request.json()
  return forwardMutation(params.categoryId, "PUT", payload)
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const payload = await request.json()
  return forwardMutation(params.categoryId, "PATCH", payload)
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  return forwardMutation(params.categoryId, "DELETE")
}
