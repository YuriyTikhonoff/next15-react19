import { useCallback, useState } from "react"

import useSWR from "swr"

import { Endpoints } from "@/constants/endpoints"
import CardsRepository from "@/services/CardsRepository"
import { MemoCard } from "@/types/app"

const useContainer = (fetchedCards: MemoCard[]) => {
  const { data: cards } = useSWR(Endpoints.Cards)
  const [activeCardGroup, setActiveCardGroup] = useState<MemoCard[]>([])
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)

  const grouppedCards = fetchedCards.reduce((acc, card) => {
    const categoryName = card.category?.name || "Uncategorized"
    acc[categoryName] = acc[categoryName]
      ? [...acc[categoryName], card]
      : [card]
    return acc
  }, {} as Record<string, MemoCard[]>)

  const isPracticeCardsModeActive = activeCardIndex !== null

  const calculateNextCardIndex = (prevIndex: number, cards: MemoCard[]) => {
    const maxIndex = cards.length - 1
    return prevIndex === maxIndex ? 0 : prevIndex + 1
  }

  const activeCard = activeCardGroup[activeCardIndex ?? 0]

  const handleAddNewCard = useCallback((newCard: MemoCard) => {
    CardsRepository.addCard(newCard)
  }, [])

  const handleUpdateCard = useCallback((updatedCard: MemoCard) => {
    console.log("handleUpdateCard called with:", updatedCard)
    CardsRepository.updateCard(updatedCard)
  }, [])

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

  const handleDeleteCard = useCallback((cardId: MemoCard["id"]) => {
    CardsRepository.removeCard(cardId)
  }, [])

  const handleSetActiveCardGroup = setActiveCardGroup

  //TODO: migrate to backend storage
  // useEffect(() => {
  //   CardsRepository.saveCardsPersistently(spanishCards)
  // }, [])

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
  }
}

export default useContainer
