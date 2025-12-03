import { NextResponse } from "next/server"

import { apiBaseUrl } from "@/constants/app"

export async function GET() {
  try {
    const response = await fetch(apiBaseUrl + "/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return NextResponse.json(response.ok ? await response.json() : [])
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.error()
  }
}

export async function POST(req: Request) {
  const payload = await req.json()
  console.log("Received payload in POST:", payload)
  try {
    const response = await fetch(apiBaseUrl + "/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    console.log("Response from POST:", response)
    if (!response.ok) {
      console.error("Failed to add category:", response.statusText)
    }
    return NextResponse.json(await response.json())
  } catch (error) {
    console.error("Error posting category:", error)
    return NextResponse.error()
  }
}
