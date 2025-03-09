"use client";

import { Button, MenuItem, TextField } from "@mui/material";

import styles from "./styles.module.scss";
import { useState } from "react";
import { MemoCard } from "@/types/app";
import { INITIAL_NEW_CARD } from "./constants";

interface AddNewCardProps {
  onAddNewCard: (newCard: MemoCard) => void;
}

const AddNewCard: React.FC<AddNewCardProps> = ({ onAddNewCard }) => {
  const categories = ["Category 1", "Category 2", "Category 3"];
  const [newCard, setNewCard] = useState<MemoCard>(INITIAL_NEW_CARD);
  const [newCategory, setNewCategory] = useState<string>("");
  const [categoriesList, setCategoriesList] = useState<string[]>(categories);

  return (
    <div className={styles["add-new-card"]}>
      <h3>Add New Card Component</h3>
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
            onChange={(e) =>
              setNewCard({ ...newCard, category: e.target.value })
            }
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
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={() => {
              setCategoriesList([...categoriesList, newCategory]);
              setNewCategory("");
            }}
          >
            Add Category
          </Button>
        </div>
        <Button
          onClick={() => {
            onAddNewCard(newCard);
          }}
          style={{ width: 200, height: 60 }}
          variant="outlined"
        >
          Add Card
        </Button>
      </div>
    </div>
  );
};

export default AddNewCard;
