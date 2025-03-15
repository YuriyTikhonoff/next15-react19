"use client";

import { MemoCard } from "@/types/app";
import { Button, IconButton } from "@mui/material";
import type React from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import CloseIcon from "@mui/icons-material/Close";

interface CardViewProps {
  card: MemoCard;
  isPrimarySideFront: boolean;
  onClose: VoidFunction;
}

const CardView: React.FC<CardViewProps> = ({
  card,
  isPrimarySideFront,
  onClose,
}) => {
  const [isFlipped, setIsFlipped] = useState(isPrimarySideFront);
  return (
    <div className={styles.card}>
      <IconButton className={styles["card__close-btn"]} onClick={onClose}>
        <CloseIcon />
      </IconButton>
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
