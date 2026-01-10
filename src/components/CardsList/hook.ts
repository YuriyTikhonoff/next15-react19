import { useCallback, useEffect, useState } from "react"

import { spanishCards } from "@/cards/spanish"
import CardsRepository from "@/services/CardsRepository"
import { MemoCard } from "@/types/app"
import { mutate } from "swr"
import { Endpoints } from "@/constants/endpoints"

const useContainer = (fetchedCards: MemoCard[]) => {
  const [cards, setCards] = useState<MemoCard[]>(
    fetchedCards.length > 0 ? fetchedCards : CardsRepository.getCards()
  )
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
    setCards(prev => [...prev, newCard])
    CardsRepository.addCard(newCard)
  }, [])

  const handleUpdateCard = useCallback((updatedCard: MemoCard) => {
    console.log("handleUpdateCard called with:", updatedCard)
    setCards(prev =>
      prev.map(card => (card.id === updatedCard.id ? updatedCard : card))
    )
    CardsRepository.updateCard(updatedCard)
  }, [])

  const handleCloseCardPractice = useCallback(() => {
    setActiveCardIndex(null)
  }, [])

  const handleMoveToNextCard = useCallback(() => {
    setActiveCardIndex(prevIndex =>
      prevIndex !== null
        ? calculateNextCardIndex(prevIndex, activeCardGroup)
        : null
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

  const handleDeleteCard = useCallback(async (cardId: MemoCard["id"]) => {
    setCards(prev => prev.filter(card => card.id !== cardId))
    await CardsRepository.removeCard(cardId)
    mutate(Endpoints.Cards)
  }, [])

  const handleSetActiveCardGroup = setActiveCardGroup

  useEffect(() => {
    CardsRepository.saveCardsPersistently(spanishCards)
    setCards(spanishCards)
  }, [])

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
