"use client"

import type React from "react"
import { useState } from "react"

import { IconButton } from "@mui/material"


import cardLevelsMap from "@/constants/cards"
import { MemoCard } from "@/types/app"

import DeleteCardModal from "../modals/DeleteCardModal"
import EditCardModal from "../modals/EditCardModal"

import styles from "./styles.module.scss"

interface CardsCollectionProps {
  title: string
  cards: MemoCard[]
  onDeleteCard: (cardId: MemoCard["id"]) => void
  onUpdateCard: (updatedCard: MemoCard) => void
}

const CardsCollection: React.FC<CardsCollectionProps> = ({
  title,
  cards,
  onDeleteCard,
  onUpdateCard,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const onToggleExpandCardsCollection = () => setIsExpanded(prev => !prev)
  const onDelete = (id: MemoCard["id"]) => () => {
    onDeleteCard(id)
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={onToggleExpandCardsCollection}>
          {isExpanded ? "-" : "+"}{" "}
        </IconButton>
        <h4>{`${title} (${cards.length})`}</h4>
      </div>
      {isExpanded && (
        <ul>
          {cards.map(card => (
            <li key={card.id} className={styles["card-list__item"]}>
              <div>
                <EditCardModal
                  editIconClassName={styles["card__control-icon"]}
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
