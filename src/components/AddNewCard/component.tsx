"use client"

import { Button, MenuItem, TextField } from "@mui/material"

import { MemoCard } from "@/types/app"

import useContainer from "./hook"
import styles from "./styles.module.scss"

interface AddNewCardProps {
  onAddNewCard: (newCard: MemoCard) => void
  onClose: () => void
  initialCardValues: MemoCard
}

const AddNewCard: React.FC<AddNewCardProps> = ({
  onAddNewCard,
  onClose,
  initialCardValues,
}) => {
  const {
    categoriesList,
    handleAddingCategory,
    hadleAddingTitle,
    handleAddingFront,
    handleAddingBack,
    handleCategoryInput,
    handleSelctiingCategory,
    newCard,
    newCategory,
    onAddCard,
  } = useContainer({
    initialCardValues,
    onAddNewCard,
    onClose,
  })

  return (
    <div className={styles["add-new-card"]}>
      <div className={styles["add-new-card__header"]}></div>
      <div className={styles["add-new-card__form"]}>
        <div className={styles["add-new-card__form__section"]}>
          <TextField
            sx={{ width: 300 }}
            label="Title"
            variant="outlined"
            multiline
            value={newCard.title}
            onChange={hadleAddingTitle}
          />
          <TextField
            label="Category"
            variant="outlined"
            select
            style={{ width: 300 }}
            value={newCard.category}
            onChange={handleSelctiingCategory}>
            {categoriesList.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={styles["add-new-card__form__section"]}>
          <TextField
            sx={{ width: 300 }}
            label="Front side"
            variant="outlined"
            multiline
            rows={4}
            value={newCard.front}
            onChange={handleAddingFront}
          />
          <TextField
            sx={{ width: 300 }}
            label="Rare side"
            variant="outlined"
            multiline
            rows={4}
            value={newCard.back}
            onChange={handleAddingBack}
          />
        </div>
        <div className={styles["add-new-card__category"]}>
          <TextField
            sx={{ width: 300 }}
            label="New Category"
            variant="outlined"
            value={newCategory}
            onChange={handleCategoryInput}
          />
          <Button
            sx={{ width: 300 }}
            variant="outlined"
            onClick={handleAddingCategory}>
            Add Category
          </Button>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          <Button
            onClick={onAddCard}
            sx={{ width: 300, height: 60 }}
            variant="outlined">
            Add Card
          </Button>
          <Button
            onClick={onClose}
            sx={{ width: 300, height: 60 }}
            variant="outlined">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddNewCard
