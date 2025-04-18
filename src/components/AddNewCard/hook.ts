import { useEffect, useState } from "react"

import { nanoid } from "nanoid"

import CategoriesRepository from "@/services/CategoriesRepository"
import { MemoCard } from "@/types/app"

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
  const [categoriesList, setCategoriesList] = useState<string[]>(
    CategoriesRepository.getCategories()
  )

  const onAddCard = () => {
    const enrichedNewCard = {
      ...newCard,
      lastPracticeTimestamp: new Date().toISOString(),
      createdAtTimestamp: new Date().toISOString(),
      title: newCard.title || newCard.front,
    }
    onAddNewCard(enrichedNewCard)
    onClose()
  }

  const handleCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCategory(e.target.value)

  const handleAddingCategory = () => {
    setCategoriesList([...categoriesList, newCategory])
    CategoriesRepository.addCategory(newCategory)
    setNewCategory("")
  }

  const initCardValuesEffect = () => {
    setNewCard({ ...initialCardValues, id: initialCardValues.id || nanoid() })
  }

  useEffect(initCardValuesEffect, [initialCardValues])

  return {
    categoriesList,
    handleAddingCategory,
    handleCategoryInput,
    newCard,
    newCategory,
    onAddCard,
    setCategoriesList,
    setNewCard,
    setNewCategory,
  }
}

export default useContainer
