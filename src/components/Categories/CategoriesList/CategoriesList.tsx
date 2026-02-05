import { Category } from "@/types/app"

interface CategoriesListProps {
  categories: Category[]
}

const CategoriesList = ({ categories }: CategoriesListProps) => {
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {categories.map(category => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  )
}

export default CategoriesList
