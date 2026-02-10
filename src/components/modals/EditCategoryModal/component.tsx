"use client"

import type React from "react"
import { useEffect, useState } from "react"

import EditIcon from "@mui/icons-material/Edit"
import { Button, IconButton, TextField } from "@mui/material"
import cn from "classnames"

import { Category } from "@/types/app"

import ModalComponent from "../ModalComponent"

import styles from "./styles.module.scss"

interface EditCategoryModalProps {
  category: Category
  onSubmit: (payload: { name: string }) => Promise<boolean> | boolean
  iconClassName?: string
  disabled?: boolean
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  category,
  onSubmit,
  iconClassName,
  disabled = false,
}) => {
  const [name, setName] = useState(category.name)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setName(category.name)
    setError(null)
  }, [category.id, category.name])

  const handleSubmit = async (onCloseModal: VoidFunction) => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      setError("Category name is required")
      return
    }

    try {
      setIsSubmitting(true)
      const isUpdated = await onSubmit({ name: trimmedName })
      if (isUpdated !== false) {
        onCloseModal()
      }
    } catch (submissionError) {
      console.error("Failed to update category:", submissionError)
      setError("Unable to update category. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ModalComponent
      title="Edit Category"
      renderTriggerredButton={onOpenModal => (
        <IconButton
          aria-label="Edit category"
          className={cn(styles.iconButton, {
            [iconClassName ?? ""]: Boolean(iconClassName),
          })}
          disabled={disabled || isSubmitting}
          onClick={onOpenModal}>
          <EditIcon />
        </IconButton>
      )}
      renderContent={onCloseModal => (
        <form
          className={styles.form}
          onSubmit={event => {
            event.preventDefault()
            handleSubmit(onCloseModal)
          }}>
          <TextField
            error={Boolean(error)}
            helperText={error ?? " "}
            label="Category name"
            onChange={event => setName(event.target.value)}
            value={name}
            fullWidth
          />
          <div className={styles.actions}>
            <Button
              className={styles.modalButton}
              disabled={isSubmitting}
              type="submit"
              variant="contained">
              Save
            </Button>
            <Button
              className={styles.modalButton}
              disabled={isSubmitting}
              onClick={onCloseModal}
              variant="outlined">
              Cancel
            </Button>
          </div>
        </form>
      )}
    />
  )
}

export default EditCategoryModal
