"use client"

import { Button, MenuItem, TextField } from "@mui/material"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { MemoCard } from "@/types/app"
import { nanoid } from "nanoid"
import CategoriesRepository from "@/services/CategoriesRepository"

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
  const [newCard, setNewCard] = useState<MemoCard>(initialCardValues)
  const [newCategory, setNewCategory] = useState<string>("")
  const [categoriesList, setCategoriesList] = useState<string[]>(
    CategoriesRepository.getCategories()
  )

  const onAddCard = () => {
    const enrichedNewCard = {
      ...newCard,
      //id: nanoid(),
      lastPracticeTimestamp: new Date().toISOString(),
      createdAtTimestamp: new Date().toISOString(),
    }
    onAddNewCard(enrichedNewCard)
    onClose()
  }

  const initCardValuesEffect = () => {
    setNewCard({ ...initialCardValues, id: initialCardValues.id || nanoid() })
  }

  useEffect(initCardValuesEffect, [initialCardValues])

  return (
    <div className={styles["add-new-card"]}>
      <div className={styles["add-new-card__header"]}></div>
      <div className={styles["add-new-card__form"]}>
        <div style={{ display: "flex", gap: 20, width: "100%" }}>
          <TextField
            sx={{ width: 300 }}
            label="Front side"
            variant="outlined"
            multiline
            rows={4}
            value={newCard.front}
            onChange={e => setNewCard({ ...newCard, front: e.target.value })}
          />
          <TextField
            sx={{ width: 300 }}
            label="Rare side"
            variant="outlined"
            multiline
            rows={4}
            value={newCard.back}
            onChange={e => setNewCard({ ...newCard, back: e.target.value })}
          />
        </div>
        <div className={styles["add-new-card__category"]}>
          <TextField
            label="Category"
            variant="outlined"
            select
            style={{ width: 200 }}
            value={newCard.category}
            onChange={e => {
              setNewCard({ ...newCard, category: e.target.value })
            }}>
            {categoriesList.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="New Category"
            variant="outlined"
            value={newCategory}
            onChange={e => {
              setNewCategory(e.target.value)
            }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              setCategoriesList([...categoriesList, newCategory])
              CategoriesRepository.addCategory(newCategory)
              setNewCategory("")
            }}>
            Add Category
          </Button>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <Button
            onClick={onAddCard}
            sx={{ width: 200, height: 60 }}
            variant="outlined">
            Add Card
          </Button>
          <Button
            onClick={onClose}
            sx={{ width: 200, height: 60 }}
            variant="outlined">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddNewCard
