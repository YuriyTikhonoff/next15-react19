import { Category } from "@/types/app"

import styles from "./styles.module.scss"

interface CategoryItemProps {
  category: Category
  onClick?: () => void
}

const CategoryItem = ({ category, onClick }: CategoryItemProps) => {
  const className = `${styles.root} ${onClick ? styles.clickable : ""}`.trim()

  return (
    <button onClick={onClick} className={className} type="button">
      {category.name}
    </button>
  )
}

export default CategoryItem
