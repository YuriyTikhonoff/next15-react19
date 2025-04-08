import { useState } from "react"

import { MemoCard } from "@/types/app"

interface UseContainerParams {
  onDeleteCard: (cardId: MemoCard["id"]) => void
}

const useContainer = ({ onDeleteCard }: UseContainerParams) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const onToggleExpandCardsCollection = () => setIsExpanded(prev => !prev)

  const onDelete = (id: MemoCard["id"]) => () => {
    onDeleteCard(id)
  }
  return {
    isExpanded,
    onToggleExpandCardsCollection,
    onDelete,
  }
}

export default useContainer
