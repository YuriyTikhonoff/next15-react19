import { NextResponse } from "next/server"

import { apiBaseUrl } from "@/constants/app"

const categoriesEndpoint = `${apiBaseUrl}/categories`

export async function GET() {
  try {
    const response = await fetch(categoriesEndpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (!response.ok) {
      const message = `Failed to fetch categories: ${response.status} ${response.statusText}`
      return NextResponse.json({ error: message }, { status: response.status })
    }

    const categories = await response.json()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { error: "Unexpected error while fetching categories" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json()

    const response = await fetch(categoriesEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const responseBody = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error("Failed to add category:", response.statusText)
      return NextResponse.json(responseBody, { status: response.status })
    }

    return NextResponse.json(responseBody)
  } catch (error) {
    console.error("Error posting category:", error)
    return NextResponse.json(
      { error: "Unexpected error while creating category" },
      { status: 500 }
    )
  }
}
