"use client"

import { Button, MenuItem, TextField } from "@mui/material"

import { MemoCard } from "@/types/app"

import useContainer from "./hook"
import styles from "./styles.module.scss"

interface AddNewCardProps {
  onAddNewCard: (newCard: MemoCard) => void
  onClose: VoidFunction
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
            className={styles["add-new-card__form__input"]}
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
            className={styles["add-new-card__form__input"]}
            value={newCard.category}
            onChange={handleSelctiingCategory}>
            {categoriesList.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={styles["add-new-card__category"]}>
          <TextField
            className={styles["add-new-card__form__btn"]}
            label="New Category"
            variant="outlined"
            value={newCategory}
            onChange={handleCategoryInput}
          />
          <Button
            className={styles["add-new-card__form__btn"]}
            variant="outlined"
            onClick={handleAddingCategory}>
            Add Category
          </Button>
        </div>
        <div className={styles["add-new-card__form__section"]}>
          <TextField
            className={styles["add-new-card__form__input"]}
            label="Front side"
            variant="outlined"
            multiline
            rows={4}
            value={newCard.front}
            onChange={handleAddingFront}
          />
          <TextField
            className={styles["add-new-card__form__input"]}
            label="Rare side"
            variant="outlined"
            multiline
            rows={4}
            value={newCard.back}
            onChange={handleAddingBack}
          />
        </div>

        <div className={styles["add-new-card__form__controls__wrapper"]}>
          <Button
            onClick={onClose}
            className={styles["add-new-card__form__controls__btn"]}
            variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={onAddCard}
            className={styles["add-new-card__form__controls__btn"]}
            variant="outlined">
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddNewCard
