"use client"

import type React from "react"

import ModelTrainingIcon from "@mui/icons-material/ModelTraining"
import { IconButton } from "@mui/material"
import cn from "classnames"

import cardLevelsMap from "@/constants/cards"
import { MemoCard } from "@/types/app"
import { getTimeAgoValue } from "@/utils/getTimeAgoValue"

import DeleteCardModal from "../modals/DeleteCardModal"
import EditCardModal from "../modals/EditCardModal"

import useContainer from "./hook"
import styles from "./styles.module.scss"

interface CardsCollectionProps {
  cards: MemoCard[]
  onDeleteCard: (cardId: MemoCard["id"]) => void
  onUpdateCard: (updatedCard: MemoCard) => void
  onPracticeCardGroup: VoidFunction
  title: string
}

const CardsCollection: React.FC<CardsCollectionProps> = ({
  title,
  cards,
  onDeleteCard,
  onUpdateCard,
  onPracticeCardGroup,
}) => {
  const {
    handleCardPracticeRediness,
    handleDeleteCard,
    handleToggleExpandCardsCollection,
    isExpanded,
  } = useContainer({
    onDeleteCard,
  })

  return (
    <div>
      <div className={styles["card-list__title"]}>
        <IconButton
          onClick={handleToggleExpandCardsCollection}
          className={styles["card-list__title__icon-btn"]}>
          {isExpanded ? "-" : "+"}
        </IconButton>
        <h4>{`${title} (${cards.length})`}</h4>
        <IconButton
          className={cn(styles["card__control-icon"], styles["practice-icon"])}
          onClick={onPracticeCardGroup}>
          <ModelTrainingIcon />
        </IconButton>
      </div>
      {isExpanded && (
        <ul>
          {cards.map(card => (
            <li key={card.id} className={styles["card-list__item"]}>
              <div>
                <EditCardModal
                  editIconClassName={cn(
                    styles["card__control-icon"],
                    styles["edit-icon"]
                  )}
                  onAddNewCard={onUpdateCard}
                  initialCardValues={{ ...card }}
                />
                <DeleteCardModal
                  onDeleteCard={handleDeleteCard(card.id)}
                  deleteIconClassName={styles["card__control-icon"]}
                />
              </div>
              <div className={styles["card__name"]}>{card.title}</div>
              <div className={styles["card__level"]}>
                {cardLevelsMap.get(card.level)?.text}
              </div>
              <div>{getTimeAgoValue(card.lastPracticeTimestamp)}</div>
              <div style={{ marginLeft: 20 }}>
                {handleCardPracticeRediness(
                  card.lastPracticeTimestamp,
                  card.level
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CardsCollection
