"use client"

import type React from "react"

import { IconButton } from "@mui/material"
import cn from "classnames"

import cardLevelsMap from "@/constants/cards"
import { MemoCard } from "@/types/app"

import DeleteCardModal from "../modals/DeleteCardModal"
import EditCardModal from "../modals/EditCardModal"

import useContainer from "./hook"
import styles from "./styles.module.scss"

interface CardsCollectionProps {
  cards: MemoCard[]
  onDeleteCard: (cardId: MemoCard["id"]) => void
  onUpdateCard: (updatedCard: MemoCard) => void
  title: string
}

const CardsCollection: React.FC<CardsCollectionProps> = ({
  title,
  cards,
  onDeleteCard,
  onUpdateCard,
}) => {
  const { isExpanded, onToggleExpandCardsCollection, onDelete } = useContainer({
    onDeleteCard,
  })

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={onToggleExpandCardsCollection}
          style={{ width: 50 }}>
          {isExpanded ? "-" : "+"}
        </IconButton>
        <h4>{`${title} (${cards.length})`}</h4>
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
                  onDeleteCard={onDelete(card.id)}
                  deleteIconClassName={styles["card__control-icon"]}
                />
              </div>
              <div className={styles["card__name"]}>{card.front}</div>
              <div className={styles["card__level"]}>
                {cardLevelsMap.get(card.level)?.text}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CardsCollection
