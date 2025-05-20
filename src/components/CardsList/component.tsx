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
    handleAddNewCard,
    handleCloseCardPractice,
    handleDeleteCard,
    handleMoveToNextCard,
    handlePracticeAllCards,
    handlePracticeCardGroup,
    handleUpdateCard,
    isPracticeCardsModeActive,
    handleSetActiveCardGroup,
  } = useContainer()

  return (
    <div className={styles["cards-list"]}>
      <div className={styles["cards-list__controls"]}>
        <Button onClick={handlePracticeAllCards}>Practice All Cards</Button>
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
            isPrimarySideFront
            onClose={handleCloseCardPractice}
            onDeleteCard={handleDeleteCard}
            onUpdateCard={handleUpdateCard}
            onNextCard={handleMoveToNextCard}
            onSetActiveCardGroup={handleSetActiveCardGroup}
          />
        </div>
      )}
    </div>
  )
}

export default CardsList
