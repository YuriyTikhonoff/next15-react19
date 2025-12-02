import { NextResponse } from "next/server"

import { clientApiBaseUrl } from "@/constants/app"

export async function GET() {
  try {
    const response = await fetch(clientApiBaseUrl + "/categories", {
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
