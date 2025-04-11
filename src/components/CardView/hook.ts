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

  const onIncresedCardLevel = () => {
    const updatedCard = {
      ...card,
      level: card.level + 1,
      lastPracticeTimestamp: new Date().toISOString(),
    }
    onUpdateCard(updatedCard)
    onNextCard()
  }

  const onDelete = () => {
    onDeleteCard(card.id)
    onClose()
  }

  return {
    isFlipped,
    onDelete,
    onIncresedCardLevel,
    setIsFlipped,
  }
}

export default useContainer
