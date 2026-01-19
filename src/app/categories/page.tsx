import { apiBaseUrl } from "@/constants/app"

const CategoriesPage = async () => {
  let categories = []
  try {
    const data = await fetch(`${apiBaseUrl}/categories`, { cache: "no-store" })
    categories = await data.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return <div>Error loading categories.</div>
  }
  return (
    <div>
      <h2>Categories Page</h2>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
    </div>
  )
}

export default CategoriesPage
