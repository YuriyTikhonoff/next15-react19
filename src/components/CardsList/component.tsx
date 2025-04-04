"use client"

import type React from "react"

import { Button } from "@mui/material"

import CardsCollection from "../CardsCollection"
import CardView from "../CardView"
import AddNewCardModal from "../modals/AddNewCardModal"

import useContainer from "./hook"
import styles from "./styles.module.scss"

const CardsList: React.FC = () => {
  const {
    activeCard,
    grouppedCards,
    isPracticeCardsModeActive,
    onAddNewCard,
    onCloseCardPractice,
    onDeleteCard,
    onNextCard,
    onPracticeCards,
    onUpdateCard,
  } = useContainer()

  return (
    <div className={styles["cards-list"]}>
      <div className={styles["cards-list__controls"]}>
        <Button onClick={onPracticeCards}>Practice Cards</Button>
        <AddNewCardModal onAddNewCard={onAddNewCard} />
      </div>
      <ul>
        {Object.entries(grouppedCards).map(([category, cards]) => (
          <CardsCollection
            key={category}
            title={category}
            cards={cards}
            onDeleteCard={onDeleteCard}
            onUpdateCard={onUpdateCard}
          />
        ))}
      </ul>
      {isPracticeCardsModeActive && (
        <div>
          <CardView
            card={activeCard}
            onClose={onCloseCardPractice}
            onDeleteCard={onDeleteCard}
            onUpdateCard={onUpdateCard}
            onNextCard={onNextCard}
            isPrimarySideFront
          />
        </div>
      )}
    </div>
  )
}

export default CardsList
