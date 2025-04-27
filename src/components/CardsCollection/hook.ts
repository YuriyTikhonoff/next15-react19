import { useState } from "react"

import { MemoCard } from "@/types/app"

interface UseContainerParams {
  onDeleteCard: (cardId: MemoCard["id"]) => void
}

const useContainer = ({ onDeleteCard }: UseContainerParams) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleExpandCardsCollection = () => setIsExpanded(prev => !prev)

  const handleDeleteCard = (id: MemoCard["id"]) => () => {
    onDeleteCard(id)
  }

  return {
    isExpanded,
    handleDeleteCard,
    handleToggleExpandCardsCollection,
  }
}

export default useContainer
