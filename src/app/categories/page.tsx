import CategoriesList from "@/components/categories/CategoriesList"
import { apiBaseUrl } from "@/constants/app"

const CategoriesPage = async () => {
  let categories = []
  try {
    const data = await fetch(`${apiBaseUrl}/categories`, { cache: "no-store" })
    if (!data.ok) {
      throw new Error(
        `Failed to fetch categories: ${data.status} ${data.statusText}`
      )
    }
    categories = await data.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return <div>Error loading categories.</div>
  }
  return (
    <div>
      <h2>Categories Page</h2>
      <CategoriesList categories={categories} />
    </div>
  )
}

export default CategoriesPage
