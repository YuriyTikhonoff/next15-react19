import { MemoCard } from "@/types/app"
import React from "react"

interface UseContainerProps {
  onUpdateCard: (updatedCard: MemoCard) => void
  card: MemoCard
}

const useContainer = ({ onUpdateCard, card }: UseContainerProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

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
