import { describe, test, expect, vi, beforeEach } from "vitest"
import axios from "axios"

import fetcher from "../fetcher"

vi.mock("axios")

describe("fetcher", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("basic requests", () => {
    test("makes a GET request with default method", async () => {
      const mockData = { id: 1, name: "test" }
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/json" },
      })

      const result = await fetcher("https://api.example.com/data")

      expect(axios.request).toHaveBeenCalledWith({
        url: "https://api.example.com/data",
        method: "GET",
        headers: undefined,
        data: undefined,
        responseType: "json",
      })
      expect(result).toEqual(mockData)
    })

    test("makes a POST request when method is specified", async () => {
      const mockData = { success: true }
      const postBody = JSON.stringify({ name: "new item" })
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/json" },
      })

      const result = await fetcher("https://api.example.com/data", {
        method: "POST",
        body: postBody,
      })

      expect(axios.request).toHaveBeenCalledWith({
        url: "https://api.example.com/data",
        method: "POST",
        headers: undefined,
        data: postBody,
        responseType: "json",
      })
      expect(result).toEqual(mockData)
    })

    test("handles Request object as input", async () => {
      const mockData = { id: 2 }
      const request = new Request("https://api.example.com/resource")
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/json" },
      })

      const result = await fetcher(request)

      expect(axios.request).toHaveBeenCalledWith({
        url: "https://api.example.com/resource",
        method: "GET",
        headers: undefined,
        data: undefined,
        responseType: "json",
      })
      expect(result).toEqual(mockData)
    })
  })

  describe("header normalization", () => {
    test("normalizes Headers object to plain object", async () => {
      const mockData = { data: "test" }
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer token123",
      })
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/json" },
      })

      await fetcher("https://api.example.com/data", {
        headers,
      })

      expect(axios.request).toHaveBeenCalledWith({
        url: "https://api.example.com/data",
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer token123",
        },
        data: undefined,
        responseType: "json",
      })
    })

    test("normalizes array headers to plain object", async () => {
      const mockData = { data: "test" }
      const headers: [string, string][] = [
        ["Content-Type", "application/json"],
        ["X-Custom-Header", "custom-value"],
      ]
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/json" },
      })

      await fetcher("https://api.example.com/data", {
        headers,
      })

      expect(axios.request).toHaveBeenCalledWith({
        url: "https://api.example.com/data",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": "custom-value",
        },
        data: undefined,
        responseType: "json",
      })
    })

    test("passes through plain object headers unchanged", async () => {
      const mockData = { data: "test" }
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer token456",
      }
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/json" },
      })

      await fetcher("https://api.example.com/data", {
        headers,
      })

      expect(axios.request).toHaveBeenCalledWith({
        url: "https://api.example.com/data",
        method: "GET",
        headers,
        data: undefined,
        responseType: "json",
      })
    })

    test("handles undefined headers", async () => {
      const mockData = { data: "test" }
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/json" },
      })

      await fetcher("https://api.example.com/data", {})

      expect(axios.request).toHaveBeenCalledWith({
        url: "https://api.example.com/data",
        method: "GET",
        headers: undefined,
        data: undefined,
        responseType: "json",
      })
    })
  })

  describe("error handling", () => {
    test("throws error when content-type is not JSON", async () => {
      vi.mocked(axios.request).mockResolvedValue({
        data: "<html>Not JSON</html>",
        headers: { "content-type": "text/html" },
      })

      await expect(
        fetcher("https://api.example.com/data")
      ).rejects.toThrow(
        'Invalid content type: expected JSON but received "text/html"'
      )
    })

    test("throws error when content-type is missing", async () => {
      vi.mocked(axios.request).mockResolvedValue({
        data: "some data",
        headers: {},
      })

      await expect(
        fetcher("https://api.example.com/data")
      ).rejects.toThrow('Invalid content type: expected JSON but received ""')
    })

    test("throws error when content-type is XML", async () => {
      vi.mocked(axios.request).mockResolvedValue({
        data: "<xml>Data</xml>",
        headers: { "content-type": "application/xml" },
      })

      await expect(
        fetcher("https://api.example.com/data")
      ).rejects.toThrow(
        'Invalid content type: expected JSON but received "application/xml"'
      )
    })

    test("propagates axios errors", async () => {
      const error = new Error("Network error")
      vi.mocked(axios.request).mockRejectedValue(error)

      await expect(
        fetcher("https://api.example.com/data")
      ).rejects.toThrow("Network error")
    })
  })

  describe("response parsing", () => {
    test("accepts standard application/json content-type", async () => {
      const mockData = { id: 1, value: "test" }
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/json" },
      })

      const result = await fetcher("https://api.example.com/data")

      expect(result).toEqual(mockData)
    })

    test("accepts application/json with charset parameter", async () => {
      const mockData = { id: 2, value: "test2" }
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/json; charset=utf-8" },
      })

      const result = await fetcher("https://api.example.com/data")

      expect(result).toEqual(mockData)
    })

    test("accepts JSON with +json suffix", async () => {
      const mockData = { id: 3, type: "ld+json" }
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/ld+json" },
      })

      const result = await fetcher("https://api.example.com/data")

      expect(result).toEqual(mockData)
    })

    test("returns typed response data", async () => {
      interface User {
        id: number
        name: string
        email: string
      }

      const mockUser: User = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      }

      vi.mocked(axios.request).mockResolvedValue({
        data: mockUser,
        headers: { "content-type": "application/json" },
      })

      const result = await fetcher<User>("https://api.example.com/user/1")

      expect(result).toEqual(mockUser)
      expect(result.id).toBe(1)
      expect(result.name).toBe("John Doe")
      expect(result.email).toBe("john@example.com")
    })

    test("handles empty response data", async () => {
      vi.mocked(axios.request).mockResolvedValue({
        data: null,
        headers: { "content-type": "application/json" },
      })

      const result = await fetcher("https://api.example.com/data")

      expect(result).toBeNull()
    })

    test("handles array response data", async () => {
      const mockArray = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ]
      vi.mocked(axios.request).mockResolvedValue({
        data: mockArray,
        headers: { "content-type": "application/json" },
      })

      const result = await fetcher("https://api.example.com/items")

      expect(result).toEqual(mockArray)
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe("different HTTP methods", () => {
    test("handles PUT requests", async () => {
      const mockData = { updated: true }
      const putBody = JSON.stringify({ name: "updated item" })
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/json" },
      })

      await fetcher("https://api.example.com/data/1", {
        method: "PUT",
        body: putBody,
      })

      expect(axios.request).toHaveBeenCalledWith({
        url: "https://api.example.com/data/1",
        method: "PUT",
        headers: undefined,
        data: putBody,
        responseType: "json",
      })
    })

    test("handles DELETE requests", async () => {
      const mockData = { deleted: true }
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/json" },
      })

      await fetcher("https://api.example.com/data/1", {
        method: "DELETE",
      })

      expect(axios.request).toHaveBeenCalledWith({
        url: "https://api.example.com/data/1",
        method: "DELETE",
        headers: undefined,
        data: undefined,
        responseType: "json",
      })
    })

    test("handles PATCH requests", async () => {
      const mockData = { patched: true }
      const patchBody = JSON.stringify({ name: "patched item" })
      vi.mocked(axios.request).mockResolvedValue({
        data: mockData,
        headers: { "content-type": "application/json" },
      })

      await fetcher("https://api.example.com/data/1", {
        method: "PATCH",
        body: patchBody,
      })

      expect(axios.request).toHaveBeenCalledWith({
        url: "https://api.example.com/data/1",
        method: "PATCH",
        headers: undefined,
        data: patchBody,
        responseType: "json",
      })
    })
  })
})
