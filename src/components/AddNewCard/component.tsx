"use client";

import { Button, IconButton, MenuItem, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.scss";
import { useState } from "react";
import { MemoCard } from "@/types/app";
import { INITIAL_NEW_CARD } from "./constants";
import { nanoid } from "nanoid";
import CategoriesRepository from "@/services/CategoriesRepository";

interface AddNewCardProps {
  onAddNewCard: (newCard: MemoCard) => void;
  onClose: () => void;
}

const AddNewCard: React.FC<AddNewCardProps> = ({ onAddNewCard, onClose }) => {
  const [newCard, setNewCard] = useState<MemoCard>(INITIAL_NEW_CARD);
  const [newCategory, setNewCategory] = useState<string>("");
  const [categoriesList, setCategoriesList] = useState<string[]>(
    CategoriesRepository.getCategories()
  );

  const onAddCard = () => {
    const enrichedNewCard = {
      ...newCard,
      id: nanoid(),
      lastPracticeTimestamp: new Date().toISOString(),
    };
    onAddNewCard(enrichedNewCard);
  };

  return (
    <div className={styles["add-new-card"]}>
      <div className={styles["add-new-card__header"]}>
        <h3>Add New Card Component</h3>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles["add-new-card__form"]}>
        <div style={{ display: "flex", gap: 20, width: "100%" }}>
          <TextField
            sx={{ width: 300 }}
            label="Front side"
            variant="outlined"
            multiline
            rows={4}
            onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
          />
          <TextField
            sx={{ width: 300 }}
            label="Rare side"
            variant="outlined"
            multiline
            rows={4}
            onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
          />
        </div>
        <div className={styles["add-new-card__category"]}>
          <TextField
            label="Category"
            variant="outlined"
            select
            style={{ width: 200 }}
            onChange={(e) => {
              setNewCard({ ...newCard, category: e.target.value });
            }}
          >
            {categoriesList.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="New Category"
            variant="outlined"
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
            }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              setCategoriesList([...categoriesList, newCategory]);
              CategoriesRepository.addCategory(newCategory);
              setNewCategory("");
            }}
          >
            Add Category
          </Button>
        </div>
        <Button
          onClick={onAddCard}
          sx={{ width: 200, height: 60 }}
          variant="outlined"
        >
          Add Card
        </Button>
      </div>
    </div>
  );
};

export default AddNewCard;
