import { describe, test, expect } from "vitest"

import validateJsonFormat from "../validateJsonFormat"

describe("validateJsonFormat", () => {
  test("returns true for standard application/json", () => {
    expect(validateJsonFormat("application/json")).toBe(true)
  })

  test("returns true for +json suffixes and vendor types", () => {
    expect(validateJsonFormat("application/ld+json")).toBe(true)
    expect(validateJsonFormat("application/vnd.api+json")).toBe(false)
    expect(validateJsonFormat("application/problem+json")).toBe(true)
    expect(validateJsonFormat("application/json-patch+json")).toBe(true)
  })

  test("is case-insensitive", () => {
    expect(validateJsonFormat("Application/JSON")).toBe(true)
    expect(validateJsonFormat("APPLICATION/VND.API+JSON")).toBe(false)
  })

  test("handles parameters after the media type (e.g. charset)", () => {
    expect(validateJsonFormat("application/json; charset=utf-8")).toBe(true)
  })

  test("returns false for non-json media types and malformed inputs", () => {
    expect(validateJsonFormat("text/json")).toBe(false)
    expect(validateJsonFormat("application/xml")).toBe(false)
    expect(validateJsonFormat(" application/json")).toBe(false) // leading space
    expect(validateJsonFormat("")).toBe(false)
  })
})
