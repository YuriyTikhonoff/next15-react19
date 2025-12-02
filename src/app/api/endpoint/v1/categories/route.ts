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
