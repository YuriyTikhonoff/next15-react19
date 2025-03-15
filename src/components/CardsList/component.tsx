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

  return (
    <div>
      <h2>Cards List</h2>
      <Button onClick={() => setActiveCardIndex(cards.length > 0 ? 0 : null)}>
        Practice Cards
      </Button>
      <ul>
        {Object.entries(grouppedCards).map(([category, cards]) => (
          <CardsCollection key={category} title={category} cards={cards} />
        ))}
      </ul>
      {isPracticeCardsModeActive && (
        <div>
          <Button
            onClick={() =>
              setActiveCardIndex(calculateNextCardIndex(activeCardIndex, cards))
            }
          >
            Next Card
          </Button>

          <CardView
            card={activeCard}
            onClose={onCloseCardPractice}
            isPrimarySideFront
          />
        </div>
      )}
      {showAddNewCard ? (
        <AddNewCard onAddNewCard={onAddNewCard} onClose={onClose} />
      ) : (
        <IconButton onClick={() => setShowAddNewCard(true)}>
          <AddBoxIcon />
        </IconButton>
      )}
    </div>
  );
};

export default CardsList;
