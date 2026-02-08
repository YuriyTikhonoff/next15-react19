"use client"

import cn from "classnames"

import DeleteCardModalButton from "@/components/modals/DeleteCardModal"
import { Category } from "@/types/app"

import styles from "./styles.module.scss"

interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div>
      <div className={cn(styles.root)}>{category.name}</div>
      <DeleteCardModalButton onDeleteCard={() => {}} />
    </div>
  )
}

export default CategoryItem
