import { useState } from "react"

import { CardViewProps } from "./component"

type UseContainerParams = CardViewProps

const useContainer = ({
  card,
  isPrimarySideFront,
  onClose,
  onDeleteCard,
  onNextCard,
  onUpdateCard,
}: UseContainerParams) => {
  const [isFlipped, setIsFlipped] = useState(isPrimarySideFront)

  const handleIncreseCardLevel = () => {
    const updatedCard = {
      ...card,
      level: card.level + 1,
      lastPracticeTimestamp: new Date().toISOString(),
    }
    onUpdateCard(updatedCard)
    onNextCard()
  }

  const handleMoveToNextCard = () => {
    const updatedCard = {
      ...card,
      lastPracticeTimestamp: new Date().toISOString(),
    }
    onUpdateCard(updatedCard)
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
