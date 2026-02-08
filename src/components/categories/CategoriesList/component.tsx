import { Category } from "@/types/app"

import CategoryItem from "../CategoryItem/component"

interface CategoriesListProps {
  categories: Category[]
}

const CategoriesList = ({ categories }: CategoriesListProps) => {
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {categories.map(category => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default CategoriesList
