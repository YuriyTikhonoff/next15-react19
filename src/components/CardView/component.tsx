"use client";

import { MemoCard } from "@/types/app";
import { Button } from "@mui/material";
import type React from "react";
import { useState } from "react";
import styles from "./styles.module.scss";

interface CardViewProps {
  card: MemoCard;
  isPrimarySideFront: boolean;
}

const CardView: React.FC<CardViewProps> = ({ card, isPrimarySideFront }) => {
  const [isFlipped, setIsFlipped] = useState(isPrimarySideFront);
  return (
    <div className={styles.card}>
      <div className={styles["card__content"]}>
        {isFlipped ? card.front : card.back}
      </div>
      <Button
        onClick={() => setIsFlipped((isFlipped) => !isFlipped)}
        variant="outlined"
      >
        Flip
      </Button>
    </div>
  );
};

export default CardView;
