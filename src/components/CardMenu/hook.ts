import React from "react"

import { MemoCard } from "@/types/app"

interface UseContainerProps {
  onUpdateCard: (updatedCard: MemoCard) => void
  card: MemoCard
}

const useContainer = ({ onUpdateCard, card }: UseContainerProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  console.log("qqq----------useContainer card", card)

  const isOpen = Boolean(anchorEl)
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleToggleDefaultBackSide = () => {
    const updatedCard = {
      ...card,
      useReversedDefaultView: !card.useReversedDefaultView,
    }
    onUpdateCard(updatedCard)
    handleClose()
  }

  return {
    isOpen,
    anchorEl,
    handleOpenMenu,
    handleClose,
    handleToggleDefaultBackSide,
  }
}

export default useContainer
