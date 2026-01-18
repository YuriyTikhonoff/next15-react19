import { apiBaseUrl } from "@/constants/app"

const categoriesPage = async () => {
  const data = await fetch(`${apiBaseUrl}/categories`, { cache: "no-store" })
  const categories = await data.json()
  return (
    <div>
      <h2>Categories Page</h2>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
    </div>
  )
}

export default categoriesPage
