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
    handleAddNewCard,
    handleCloseCardPractice,
    handleDeleteCard,
    handleMoveToNextCard,
    handlePracticeCards,
    handleUpdateCard,
    handlePracticeCardGroup,
  } = useContainer()

  return (
    <div className={styles["cards-list"]}>
      <div className={styles["cards-list__controls"]}>
        <Button onClick={handlePracticeCards}>Practice Cards</Button>
        <AddNewCardModal onAddNewCard={handleAddNewCard} />
      </div>
      <ul>
        {Object.entries(grouppedCards).map(([category, cards]) => (
          <CardsCollection
            key={category}
            title={category}
            cards={cards}
            onDeleteCard={handleDeleteCard}
            onUpdateCard={handleAddNewCard}
            onPracticeCardGroup={handlePracticeCardGroup(cards)}
          />
        ))}
      </ul>
      {isPracticeCardsModeActive && (
        <div>
          <CardView
            card={activeCard}
            onClose={handleCloseCardPractice}
            onDeleteCard={handleDeleteCard}
            onUpdateCard={handleUpdateCard}
            onNextCard={handleMoveToNextCard}
            isPrimarySideFront
          />
        </div>
      )}
    </div>
  )
}

export default CardsList
