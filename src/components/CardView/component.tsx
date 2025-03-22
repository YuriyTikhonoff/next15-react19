"use client";

import { MemoCard } from "@/types/app";
import { Button, IconButton, Modal } from "@mui/material";
import type React from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface CardViewProps {
  card: MemoCard;
  isPrimarySideFront: boolean;
  onClose: VoidFunction;
  onNextCard: VoidFunction;
  onUpdateCard: (updatedCard: MemoCard) => void;
  onDeleteCard: (cardId: MemoCard["id"]) => void;
}

const CardView: React.FC<CardViewProps> = ({
  card,
  isPrimarySideFront,
  onClose,
  onDeleteCard,
  onNextCard,
  onUpdateCard,
}) => {
  const [isFlipped, setIsFlipped] = useState(isPrimarySideFront);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => setIsModalOpen(false);
  const onIncresedCardLevel = () => {
    const updatedCard = {
      ...card,
      level: card.level + 1,
      lastPracticeTimestamp: new Date().toISOString(),
    };
    onUpdateCard(updatedCard);
    onNextCard();
  };
  const onDelete = () => {
    onDeleteCard(card.id);
    onClose();
  };

  return (
    <div className={styles.card}>
      <IconButton className={styles["card__delete-btn"]} onClick={onOpenModal}>
        <DeleteOutlineIcon />
      </IconButton>
      <Modal
        open={isModalOpen}
        onClose={onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles["card__modal-overlay"]}
      >
        <div className={styles["card__modal"]}>
          <div>Are you sure you want to delete this card?</div>
          <div className={styles["card__modal-controls"]}>
            <Button onClick={onDelete} variant="outlined">
              Yes
            </Button>
            <Button onClick={onCloseModal} variant="outlined">
              No
            </Button>
          </div>
        </div>
      </Modal>
      <IconButton className={styles["card__close-btn"]} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <div className={styles["card__content"]}>
        {isFlipped ? card.front : card.back}
      </div>
      <div className={styles["card__controls"]}>
        <Button
          onClick={() => setIsFlipped((isFlipped) => !isFlipped)}
          variant="outlined"
        >
          Flip
        </Button>
        <Button onClick={onNextCard} variant="outlined">
          Next Card
        </Button>
        <Button onClick={onIncresedCardLevel} variant="outlined">
          Increased Level
        </Button>
      </div>
    </div>
  );
};

export default CardView;
