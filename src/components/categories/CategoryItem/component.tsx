import cn from "classnames"

import { Category } from "@/types/app"

import styles from "./styles.module.scss"

interface CategoryItemProps {
  category: Category
  onClick?: () => void
}

const CategoryItem = ({ category, onClick }: CategoryItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(styles.root, { [styles.clickable]: onClick })}
      type="button">
      {category.name}
    </button>
  )
}

export default CategoryItem
