"use client";

import { MemoCard } from "@/types/app";
import { IconButton } from "@mui/material";
import type React from "react";
import { useState } from "react";

interface CardsCollectionProps {
  title: string;
  cards: MemoCard[];
}

const CardsCollection: React.FC<CardsCollectionProps> = ({ title, cards }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => setIsExpanded((prev) => !prev)}>
          {isExpanded ? "-" : "+"}{" "}
        </IconButton>
        <h2>{`${title} (${cards.length})`}</h2>
      </div>
      {isExpanded && (
        <ul>
          {cards.map((card) => (
            <li key={card.id}>{card.front}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CardsCollection;
