"use client"

import type React from "react"
import { Dispatch, SetStateAction } from "react"

import CloseIcon from "@mui/icons-material/Close"
import BackSideAsDefault from "@mui/icons-material/SettingsBackupRestore"
import { Button, IconButton } from "@mui/material"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import cardLevelsMap from "@/constants/cards"
import { MemoCard } from "@/types/app"
import { getTimeAgoValue } from "@/utils/getTimeAgoValue"

import CardMenu from "../CardMenu"

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
      <CardMenu
        card={card}
        onDeleteCard={handleDeleteCard}
        onIncreaseCardLevel={handleIncreseCardLevel}
        onUpdateCard={onUpdateCard}
      />
      <div className={styles["card__level"]}>
        {cardLevelsMap.get(card.level)?.text}
      </div>
      <IconButton className={styles["card__close-btn"]} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      {!card.useReversedDefaultView && (
        <div style={{ marginLeft: 8 }} title="Reversed Default View">
          <BackSideAsDefault style={{ color: "#90caf9" }} />
        </div>
      )}
      <div className={styles["card__content"]}>
        {isFlipped ? card.front : card.back}
      </div>
      <div className={styles["card__content"]}>
        {getTimeAgoValue(card.lastPracticeTimestamp)}
      </div>
      <div className={styles["card__controls"]}>
        <div className={styles["card__btn-group"]}>
          <Button onClick={handleFlipCard} variant="outlined">
            Flip
          </Button>
          <Button onClick={handleMoveToNextCard} variant="outlined">
            Next Card
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CardView
