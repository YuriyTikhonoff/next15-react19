"use client"

import type React from "react"
import cn from "classnames"

import DeleteCategoryModal from "@/components/modals/DeleteCategoryModal"
import EditCategoryModal from "@/components/modals/EditCategoryModal"
import { Category } from "@/types/app"

import styles from "./styles.module.scss"

interface CategoryItemProps {
  category: Category
  onClick?: () => void
  onDeleteCategory: (categoryId: Category["id"]) => Promise<boolean> | boolean
  onUpdateCategory: (
    categoryId: Category["id"],
    payload: { name: string }
  ) => Promise<boolean> | boolean
  disabled?: boolean
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  onClick,
  onDeleteCategory,
  onUpdateCategory,
  disabled = false,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) {
      return
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <div
      className={cn(styles.root, { [styles.clickable]: Boolean(onClick) })}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}>
      <span className={styles.name}>{category.name}</span>
      <div
        className={styles.controls}
        onClick={event => event.stopPropagation()}
        onKeyDown={event => event.stopPropagation()}>
        <EditCategoryModal
          category={category}
          disabled={disabled}
          iconClassName={styles.controlIcon}
          onSubmit={({ name }) => onUpdateCategory(category.id, { name })}
        />
        <DeleteCategoryModal
          categoryName={category.name}
          disabled={disabled}
          iconClassName={styles.controlIcon}
          onConfirm={() => onDeleteCategory(category.id)}
        />
      </div>
    </div>
  )
}

export default CategoryItem
