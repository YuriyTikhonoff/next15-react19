"use client"

import type React from "react"

import { Button } from "@mui/material"

import { MemoCard } from "@/types/app"

import CardsCollection from "../CardsCollection"
import CardView from "../CardView"
import AddNewCardModal from "../modals/AddNewCardModal"

import useContainer from "./hook"
import styles from "./styles.module.scss"

interface CardsListProps {
  cards: MemoCard[]
}

const CardsList: React.FC<CardsListProps> = ({ cards }) => {
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
    loadingAction,
  } = useContainer(cards)

  return (
    <div className={styles["cards-list"]}>
      <div className={styles["cards-list__controls"]}>
        <Button onClick={handlePracticeAllCards}>Practice All Cards</Button>
        <AddNewCardModal
          onAddNewCard={handleAddNewCard}
          loading={loadingAction}
        />
      </div>
      <ul>
        {Object.entries(grouppedCards).map(([category, cards]) => (
          <CardsCollection
            key={category}
            title={category}
            cards={cards}
            onDeleteCard={handleDeleteCard}
            onUpdateCard={handleUpdateCard}
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
            loading={loadingAction}
            onNextCard={handleMoveToNextCard}
            onSetActiveCardGroup={handleSetActiveCardGroup}
          />
        </div>
      )}
    </div>
  )
}

export default CardsList
