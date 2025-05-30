"use client"

import type React from "react"
import { Dispatch, SetStateAction } from "react"

import CloseIcon from "@mui/icons-material/Close"
import { Button, IconButton } from "@mui/material"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import cardLevelsMap from "@/constants/cards"
import { MemoCard } from "@/types/app"
import { getTimeAgoValue } from "@/utils/getTimeAgoValue"

import DeleteCardModal from "../modals/DeleteCardModal"

import useContainer from "./hook"
import styles from "./styles.module.scss"

export interface CardViewProps {
  card: MemoCard
  isPrimarySideFront: boolean
  onClose: VoidFunction
  onDeleteCard: (cardId: MemoCard["id"]) => void
  onNextCard: VoidFunction
  onSetActiveCardGroup: Dispatch<SetStateAction<MemoCard[]>>
  onUpdateCard: (updatedCard: MemoCard) => void
}

const CardView: React.FC<CardViewProps> = ({
  card,
  isPrimarySideFront,
  onClose,
  onDeleteCard,
  onNextCard,
  onSetActiveCardGroup,
  onUpdateCard,
}) => {
  const {
    isFlipped,
    handleFlipCard,
    handleDeleteCard,
    handleIncreseCardLevel,
    handleMoveToNextCard,
  } = useContainer({
    card,
    isPrimarySideFront,
    onClose,
    onDeleteCard,
    onNextCard,
    onSetActiveCardGroup,
    onUpdateCard,
  })

  dayjs.extend(relativeTime)

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
      <div className={styles["card__content"]}>
        {getTimeAgoValue(card.lastPracticeTimestamp)}
      </div>
      <div className={styles["card__controls"]}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            style={{ width: "100%" }}
            onClick={handleFlipCard}
            variant="outlined">
            Flip
          </Button>
          <Button
            style={{ width: "100%" }}
            onClick={handleMoveToNextCard}
            variant="outlined">
            Next Card
          </Button>
        </div>

        <Button onClick={handleIncreseCardLevel} variant="outlined">
          Increased Level
        </Button>
      </div>
    </div>
  )
}

export default CardView
