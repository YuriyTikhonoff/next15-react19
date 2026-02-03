import { Category } from "@/types/app"

interface CategoriesListProps {
  categories: Category[]
}

const CategoriesList = ({ categories }: CategoriesListProps) => {
  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  )
}

export default CategoriesList
