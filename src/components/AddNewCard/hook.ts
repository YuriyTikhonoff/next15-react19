import { useEffect, useState } from "react"

import { nanoid } from "nanoid"
import useSWR from "swr"

import { Endpoints } from "@/constants/endpoints"
import CategoriesRepository from "@/services/CategoriesRepository"
import { MemoCard } from "@/types/app"
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
  const [categoriesList, setCategoriesList] = useState<
    Array<{ id: string; name: string }>
  >([])
  // CategoriesRepository.getCategories()

  const onAddCard = () => {
    const enrichedNewCard = {
      ...newCard,
      // lastPracticeTimestamp: new Date().toISOString(),
      // createdAtTimestamp: new Date().toISOString(),
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

  const handleSelectingCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = e.target.value
    const selectedCategory = categoriesList.find(cat => cat.id === categoryId)

    setNewCard({ ...newCard, category: selectedCategory || null })
  }

  const { data, error, isLoading } = useSWR(Endpoints.Categories, fetcher)
  console.log("SWR data:", data, "error:", error, "isLoading:", isLoading)

  const fetchCategories = async () => {
    const response = await fetch(`/api/categories`, {
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

  const fetchCategoriesEffect = () => {
    fetchCategories()
  }

  const initCardValuesEffect = () => {
    setNewCard({ ...initialCardValues, id: initialCardValues.id || nanoid() })
    fetchCategories()
  }

  useEffect(initCardValuesEffect, [initialCardValues])
  useEffect(fetchCategoriesEffect, [])

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
    setCategoriesList,
    setNewCategory,
  }
}

export default useContainer
