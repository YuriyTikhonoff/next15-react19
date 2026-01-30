import { useCallback, useState } from "react"

import { useRouter } from "next/navigation"

import useSWR from "swr"

import { Endpoints } from "@/constants/endpoints"
import CardsRepository from "@/services/CardsRepository"
import { MemoCard } from "@/types/app"

const useContainer = (fetchedCards: MemoCard[]) => {
  const { data: cards } = useSWR(Endpoints.Cards)
  const router = useRouter()
  const [activeCardGroup, setActiveCardGroup] = useState<MemoCard[]>([])
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const grouppedCards = fetchedCards.reduce(
    (acc, card) => {
      const categoryName = card.category?.name || "Uncategorized"
      acc[categoryName] = acc[categoryName]
        ? [...acc[categoryName], card]
        : [card]
      return acc
    },
    {} as Record<string, MemoCard[]>
  )

  const isPracticeCardsModeActive = activeCardIndex !== null

  const calculateNextCardIndex = (prevIndex: number, cards: MemoCard[]) => {
    const maxIndex = cards.length - 1
    return prevIndex === maxIndex ? 0 : prevIndex + 1
  }

  const activeCard = activeCardGroup[activeCardIndex ?? 0]

  const handleAddNewCard = useCallback(
    async (newCard: MemoCard) => {
      setLoading(true)
      const isAddedSuccessful = await CardsRepository.addCard(newCard)
      if (isAddedSuccessful) {
        router.refresh()
      }
      setLoading(false)
    },
    [router]
  )

  const handleUpdateCard = useCallback(
    async (updatedCard: MemoCard) => {
      console.log("handleUpdateCard called with:", updatedCard)
      setLoading(true)
      const isUpdatedSuccessful = await CardsRepository.updateCard(updatedCard)
      if (isUpdatedSuccessful) {
        router.refresh()
      }
      setLoading(false)
    },
    [router]
  )

  const handleCloseCardPractice = useCallback(() => {
    setActiveCardIndex(null)
  }, [])

  const handleMoveToNextCard = useCallback(() => {
    setActiveCardIndex(prevIndex =>
      prevIndex === null
        ? null
        : calculateNextCardIndex(prevIndex, activeCardGroup)
    )
  }, [activeCardGroup])

  const handlePracticeAllCards = useCallback(() => {
    setActiveCardIndex(cards.length > 0 ? 0 : null)
    setActiveCardGroup(cards)
  }, [cards])

  const handlePracticeCardGroup = useCallback(
    (cardGroup: MemoCard[]) => () => {
      setActiveCardGroup(cardGroup)
      setActiveCardIndex(0)
    },
    []
  )

  const handleDeleteCard = useCallback(
    async (cardId: MemoCard["id"]) => {
      setLoading(true)
      const isRemovedSuccessful = await CardsRepository.removeCard(cardId)
      if (isRemovedSuccessful) {
        router.refresh()
      }
      setLoading(false)
    },
    [router]
  )

  const handleSetActiveCardGroup = setActiveCardGroup

  return {
    activeCard,
    grouppedCards,
    handleAddNewCard,
    handleCloseCardPractice,
    handleDeleteCard,
    handleMoveToNextCard,
    handlePracticeAllCards,
    handlePracticeCardGroup,
    handleUpdateCard,
    isPracticeCardsModeActive,
    handleSetActiveCardGroup,
    loadingAction: loading,
  }
}

export default useContainer
