import { useState } from "react"

import dayjs from "dayjs"

import cardLevelsMap from "@/constants/cards"
import { MemoCard } from "@/types/app"
interface UseContainerParams {
  onDeleteCard: (cardId: MemoCard["id"]) => void
}

const useContainer = ({ onDeleteCard }: UseContainerParams) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCardPracticeRediness = (
    lastPracticeTimestamp: MemoCard["lastPracticeTimestamp"],
    level: MemoCard["level"]
  ) =>
    dayjs(Date.now()).diff(lastPracticeTimestamp, "day") >=
    Number(cardLevelsMap.get(level)?.daysToRest)
      ? "Ready for review"
      : "Should wait"

  const handleDeleteCard = (id: MemoCard["id"]) => () => {
    onDeleteCard(id)
  }
  const handleToggleExpandCardsCollection = () => setIsExpanded(prev => !prev)

  return {
    handleCardPracticeRediness,
    handleDeleteCard,
    handleToggleExpandCardsCollection,
    isExpanded,
  }
}

export default useContainer
