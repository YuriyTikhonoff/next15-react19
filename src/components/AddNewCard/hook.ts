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
  const [categoriesList, setCategoriesList] = useState<
    Array<{ id: string; name: string }>
  >([])
  // CategoriesRepository.getCategories()

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
    setCategoriesList([...categoriesList, { id: nanoid(), name: newCategory }])
    CategoriesRepository.addCategory(newCategory)
    setNewCategory("")
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

  const handleSelctiingCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCard({ ...newCard, category: e.target.value })
  }

  const fetchCategories = async () => {
    // console.log("apiBaseUrl", clientApiBaseUrl)
    const response = await fetch(`/api/endpoint/v1/hello-world`, {
      cache: "reload",
    })

    if (response.ok) {
      const categories = (await response.json()) as Array<{
        id: string
        name: string
      }>
      console.log("Fetched categories:", categories)
      setCategoriesList(categories)
    } else {
      console.error("Failed to fetch categories:", response.status)
    }
  }

  const initCardValuesEffect = () => {
    setNewCard({ ...initialCardValues, id: initialCardValues.id || nanoid() })
    fetchCategories()
  }

  useEffect(initCardValuesEffect, [initialCardValues])

  return {
    categoriesList,
    handleAddingCategory,
    handleAddingFront,
    handleAddingBack,
    hadleAddingTitle,
    handleCategoryInput,
    handleSelctiingCategory,
    newCard,
    newCategory,
    onAddCard,
    setCategoriesList,
    setNewCategory,
  }
}

export default useContainer
