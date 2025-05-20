import { useState } from "react"

import { MemoCard } from "@/types/app"

import { CardViewProps } from "./component"

type UseContainerParams = CardViewProps

const useContainer = ({
  card,
  isPrimarySideFront,
  onClose,
  onDeleteCard,
  onNextCard,
  onSetActiveCardGroup,
  onUpdateCard,
}: UseContainerParams) => {
  const [isFlipped, setIsFlipped] = useState(isPrimarySideFront)

  const handleIncreseCardLevel = () => {
    const updatedCard: MemoCard = {
      ...card,
      level: card.level + 1,
      lastPracticeTimestamp: new Date().toISOString(),
    }
    onUpdateCard(updatedCard)
    onNextCard()
  }

  const handleMoveToNextCard = () => {
    const updatedCard: MemoCard = {
      ...card,
      lastPracticeTimestamp: new Date().toISOString(),
    }
    onUpdateCard(updatedCard)
    onSetActiveCardGroup((prev: MemoCard[]) =>
      prev.map((card: MemoCard) =>
        card.id === updatedCard.id ? updatedCard : card
      )
    )
    onNextCard()
  }

  const handleDeleteCard = () => {
    onDeleteCard(card.id)
    onClose()
  }

  const handleFlipCard = () => {
    setIsFlipped(isFlipped => !isFlipped)
  }

  return {
    isFlipped,
    handleFlipCard,
    handleDeleteCard,
    handleIncreseCardLevel,
    handleMoveToNextCard,
  }
}

export default useContainer
