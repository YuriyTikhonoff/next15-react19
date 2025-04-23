"use client"

import type React from "react"

import CloseIcon from "@mui/icons-material/Close"
import { Button, IconButton } from "@mui/material"

import cardLevelsMap from "@/constants/cards"
import { MemoCard } from "@/types/app"

import DeleteCardModal from "../modals/DeleteCardModal"

import useContainer from "./hook"
import styles from "./styles.module.scss"

export interface CardViewProps {
  card: MemoCard
  isPrimarySideFront: boolean
  onClose: VoidFunction
  onDeleteCard: (cardId: MemoCard["id"]) => void
  onNextCard: VoidFunction
  onUpdateCard: (updatedCard: MemoCard) => void
}

const CardView: React.FC<CardViewProps> = ({
  card,
  isPrimarySideFront,
  onClose,
  onDeleteCard,
  onNextCard,
  onUpdateCard,
}) => {
  const {
    isFlipped,
    handleFlipCard,
    handleDeleteCard,
    handleIncreseCardLevel,
  } = useContainer({
    card,
    isPrimarySideFront,
    onClose,
    onDeleteCard,
    onNextCard,
    onUpdateCard,
  })

  return (
    <div className={styles.card}>
      <DeleteCardModal
        onDeleteCard={handleDeleteCard}
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
        <Button onClick={handleFlipCard} variant="outlined">
          Flip
        </Button>
        <Button onClick={onNextCard} variant="outlined">
          Next Card
        </Button>
        <Button onClick={handleIncreseCardLevel} variant="outlined">
          Increased Level
        </Button>
      </div>
    </div>
  )
}

export default CardView
