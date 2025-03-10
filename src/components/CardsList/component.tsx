"use client";

import { MemoCard } from "@/types/app";
import type React from "react";
import { useCallback, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";
import AddNewCard from "../AddNewCard";

const CardsList: React.FC = () => {
  const [cards, setCards] = useState<MemoCard[]>([]);
  const [showAddNewCard, setShowAddNewCard] = useState<boolean>(false);

  const onAddNewCard = useCallback((newCard: MemoCard) => {
    setCards((prev) => [...prev, newCard]);
    setShowAddNewCard(false);
  }, []);

  const onClose = useCallback(() => {
    setShowAddNewCard(false);
  }, []);

  return (
    <div>
      <h2>Cards List</h2>
      <ul>
        {cards.map((card, index) => (
          <li key={index}>{card.front}</li>
        ))}
      </ul>
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
