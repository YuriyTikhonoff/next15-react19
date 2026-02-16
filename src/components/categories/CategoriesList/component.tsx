"use client"

import type React from "react"
import { useCallback, useState } from "react"

import { useRouter } from "next/navigation"

import CategoriesRepository from "@/services/CategoriesRepository"
import { Category } from "@/types/app"

import CategoryItem from "../CategoryItem/component"

interface CategoriesListProps {
  categories: Category[]
}

const CategoriesList: React.FC<CategoriesListProps> = ({ categories }) => {
  const router = useRouter()
  const [pendingCategoryId, setPendingCategoryId] = useState<string | null>(
    null
  )

  const handleDeleteCategory = useCallback(
    async (categoryId: Category["id"]) => {
      setPendingCategoryId(categoryId)
      try {
        const isDeleted = await CategoriesRepository.removeCategory(
          categoryId
        )
        if (isDeleted) {
          router.refresh()
        }
        return isDeleted
      } finally {
        setPendingCategoryId(null)
      }
    },
    [router]
  )

  const handleUpdateCategory = useCallback(
    async (categoryId: Category["id"], payload: { name: string }) => {
      setPendingCategoryId(categoryId)
      try {
        const isUpdated = await CategoriesRepository.updateCategory(
          categoryId,
          payload
        )
        if (isUpdated) {
          router.refresh()
        }
        return isUpdated
      } finally {
        setPendingCategoryId(null)
      }
    },
    [router]
  )

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {categories.map(category => (
        <CategoryItem
          key={category.id}
          category={category}
          disabled={pendingCategoryId === category.id}
          onDeleteCategory={handleDeleteCategory}
          onUpdateCategory={handleUpdateCategory}
        />
      ))}
    </div>
  )
}

export default CategoriesList
