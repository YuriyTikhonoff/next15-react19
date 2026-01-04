import { useEffect, useState } from "react"

import { nanoid } from "nanoid"
import useSWR, { mutate } from "swr"

import { Endpoints } from "@/constants/endpoints"
import CategoriesRepository from "@/services/CategoriesRepository"
import { Category, MemoCard } from "@/types/app"
import fetcher from "@/utils/fetcher"

interface UseContainerParams {
  initialCardValues: MemoCard
  onAddNewCard: (newCard: MemoCard) => void
  onClose: () => void
}

const useContainer = ({
  initialCardValues,
  onAddNewCard,
  onClose,
}: UseContainerParams) => {
  const [newCard, setNewCard] = useState<MemoCard>(initialCardValues)
  const [newCategory, setNewCategory] = useState<string>("")

  const { data, error, isLoading } = useSWR(Endpoints.Categories, fetcher)
  console.log("SWR data:", data, "error:", error, "isLoading:", isLoading)

  const categoriesList: Category[] = (data as Category[] | undefined) ?? []

  const onAddCard = () => {
    const enrichedNewCard = {
      ...newCard,
      title: newCard.title || newCard.front,
    }
    onAddNewCard(enrichedNewCard)
    onClose()
  }

  const handleCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCategory(e.target.value)

  const handleAddingCategory = async () => {
    try {
      await CategoriesRepository.addCategory(newCategory)
      mutate(Endpoints.Categories)
      setNewCategory("")
    } catch (error) {
      console.error("Error adding category:", error)
    }
  }

  const hadleAddingTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCard({ ...newCard, title: e.target.value })
  }

  const handleAddingFront = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCard({ ...newCard, front: e.target.value })
  }
  const handleAddingBack = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCard({ ...newCard, back: e.target.value })
  }

  const handleSelectingCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = e.target.value
    const selectedCategory = categoriesList.find(cat => cat.id === categoryId)

    setNewCard({ ...newCard, category: selectedCategory || null })
  }

  const initCardValuesEffect = () => {
    setNewCard({ ...initialCardValues, id: initialCardValues.id || nanoid() })
  }

  useEffect(initCardValuesEffect, [initialCardValues])

  return {
    categoriesList,
    handleAddingCategory,
    handleAddingFront,
    handleAddingBack,
    hadleAddingTitle,
    handleCategoryInput,
    handleSelectingCategory,
    newCard,
    newCategory,
    onAddCard,
    setNewCategory,
  }
}

export default useContainer
