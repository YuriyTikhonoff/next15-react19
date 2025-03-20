"use client";

import { MemoCard } from "@/types/app";
import type React from "react";
import { useCallback, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button, IconButton } from "@mui/material";
import AddNewCard from "../AddNewCard";
import CardView from "../CardView";
import CardsRepository from "@/services/CardsRepository";
import CardsCollection from "../CardsCollection";

const CardsList: React.FC = () => {
  const [cards, setCards] = useState<MemoCard[]>(CardsRepository.getCards());
  const [showAddNewCard, setShowAddNewCard] = useState<boolean>(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const grouppedCards = cards.reduce((acc, card) => {
    acc[card.category] = acc[card.category]
      ? [...acc[card.category], card]
      : [card];
    return acc;
  }, {} as Record<string, MemoCard[]>);

  const onAddNewCard = useCallback((newCard: MemoCard) => {
    setCards((prev) => [...prev, newCard]);
    setShowAddNewCard(false);
    CardsRepository.addCard(newCard);
  }, []);

  const onUpdateCard = useCallback((updatedCard: MemoCard) => {
    setCards((prev) =>
      prev.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
    CardsRepository.updateCard(updatedCard);
  }, []);

  const onClose = useCallback(() => {
    setShowAddNewCard(false);
  }, []);

  const isPracticeCardsModeActive = activeCardIndex !== null;

  const calculateNextCardIndex = (prevIndex: number, cards: MemoCard[]) => {
    const maxIndex = cards.length - 1;
    return prevIndex === maxIndex ? 0 : prevIndex + 1;
  };

  const activeCard = cards[activeCardIndex ?? 0];
  const onCloseCardPractice = useCallback(() => {
    setActiveCardIndex(null);
  }, []);

  const onNextCard = useCallback(() => {
    setActiveCardIndex((prevIndex) =>
      prevIndex !== null ? calculateNextCardIndex(prevIndex, cards) : null
    );
  }, [cards]);

  const onPracticeCards = () => setActiveCardIndex(cards.length > 0 ? 0 : null);
  const onActivateAddingNewCard = () => setShowAddNewCard(true);
  const onDeleteCard = (cardId: MemoCard["id"]) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
    CardsRepository.removeCard(cardId);
  };

  return (
    <div>
      <h2>Cards List</h2>
      <Button onClick={onPracticeCards}>Practice Cards</Button>
      <ul>
        {Object.entries(grouppedCards).map(([category, cards]) => (
          <CardsCollection key={category} title={category} cards={cards} />
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
      {showAddNewCard ? (
        <AddNewCard onAddNewCard={onAddNewCard} onClose={onClose} />
      ) : (
        <IconButton onClick={onActivateAddingNewCard}>
          <AddBoxIcon />
        </IconButton>
      )}
    </div>
  );
};

export default CardsList;
