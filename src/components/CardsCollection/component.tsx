"use client";

import { MemoCard } from "@/types/app";
import { IconButton } from "@mui/material";
import type React from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import cardLevelsMap from "@/constants/cards";
import EditIcon from "@mui/icons-material/Edit";

interface CardsCollectionProps {
  title: string;
  cards: MemoCard[];
}

const CardsCollection: React.FC<CardsCollectionProps> = ({ title, cards }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const onToggleExpandCardsCollection = () => setIsExpanded((prev) => !prev);
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
          {cards.map((card) => (
            <li key={card.id} className={styles["card-list__item"]}>
              <div>
                <IconButton>
                  <EditIcon sx={{ width: 15, height: 15 }} />
                </IconButton>
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
  );
};

export default CardsCollection;
