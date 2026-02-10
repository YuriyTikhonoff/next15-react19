import { mutate } from "swr"

import { Endpoints } from "@/constants/endpoints"
import { Category } from "@/types/app"

class CategoriesRepository {
  private static instance: CategoriesRepository

  private constructor() {}

  public static getInstance(): CategoriesRepository {
    if (!this.instance) {
      this.instance = new CategoriesRepository()
    }
    return this.instance
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error(response.statusText || "Request failed")
    }
    const contentType = response.headers.get("content-type") || ""
    if (contentType.includes("application/json")) {
      return response.json()
    }
    return null
  }

  private async mutateCategoriesCache() {
    await mutate(Endpoints.Categories)
  }

  public async addCategory(categoryName: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      })
      await this.handleResponse(response)
      await this.mutateCategoriesCache()
      return true
    } catch (error) {
      console.error("Failed to add category:", error)
      return false
    }
  }

  public async updateCategory(
    categoryId: Category["id"],
    payload: Partial<Pick<Category, "name" | "parentCategoryId">>
  ): Promise<boolean> {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      await this.handleResponse(response)
      await this.mutateCategoriesCache()
      return true
    } catch (error) {
      console.error(`Failed to update category ${categoryId}:`, error)
      return false
    }
  }

  public async removeCategory(categoryId: Category["id"]): Promise<boolean> {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      })
      await this.handleResponse(response)
      await this.mutateCategoriesCache()
      return true
    } catch (error) {
      console.error(`Failed to remove category ${categoryId}:`, error)
      return false
    }
  }
}

export default CategoriesRepository.getInstance()
