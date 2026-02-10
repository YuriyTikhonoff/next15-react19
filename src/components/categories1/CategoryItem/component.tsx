/* eslint-disable jsx-a11y/no-static-element-interactions */
import cn from "classnames"

import { Category } from "@/types/app"

import styles from "./styles.module.scss"
import EditCategoryModal from "@/components/modals/EditCategoryModal/component"
import DeleteCategoryModal from "@/components/modals/DeleteCategoryModal"

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

const CategoryItem = ({
  category,
  onClick,
  onDeleteCategory,
  onUpdateCategory,
  disabled,
}: CategoryItemProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={cn(styles.root, { [styles.clickable]: Boolean(onClick) })}
      onClick={onClick}>
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
