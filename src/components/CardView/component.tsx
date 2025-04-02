"use client"

import { MemoCard } from "@/types/app"
import { Button, IconButton } from "@mui/material"
import type React from "react"
import { useState } from "react"
import styles from "./styles.module.scss"
import CloseIcon from "@mui/icons-material/Close"
import cardLevelsMap from "@/constants/cards"
import DeleteCardModal from "../modals/DeleteCardModal"

interface CardViewProps {
  card: MemoCard
  isPrimarySideFront: boolean
  onClose: VoidFunction
  onNextCard: VoidFunction
  onUpdateCard: (updatedCard: MemoCard) => void
  onDeleteCard: (cardId: MemoCard["id"]) => void
}

const CardView: React.FC<CardViewProps> = ({
  card,
  isPrimarySideFront,
  onClose,
  onDeleteCard,
  onNextCard,
  onUpdateCard,
}) => {
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

  return (
    <div className={styles.card}>
      <DeleteCardModal
        onDeleteCard={onDelete}
        deleteIconClassName={styles["card__delete-btn"]}
      />
      <div className={styles["card__level"]}>
        {cardLevelsMap.get(card.level)?.text}
      </div>
      <IconButton className={styles["card__close-btn"]} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <div className={styles["card__content"]}>
        {isFlipped ? card.front : card.back}
      </div>
      <div className={styles["card__controls"]}>
        <Button
          onClick={() => setIsFlipped(isFlipped => !isFlipped)}
          variant="outlined">
          Flip
        </Button>
        <Button onClick={onNextCard} variant="outlined">
          Next Card
        </Button>
        <Button onClick={onIncresedCardLevel} variant="outlined">
          Increased Level
        </Button>
      </div>
    </div>
  )
}

export default CardView
