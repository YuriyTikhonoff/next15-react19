"use client"

import type React from "react"
import { useState } from "react"

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { Button, IconButton } from "@mui/material"
import cn from "classnames"

import ModalComponent from "../ModalComponent"

import styles from "./styles.module.scss"

interface DeleteCategoryModalProps {
  categoryName: string
  onConfirm: () => Promise<boolean> | boolean
  iconClassName?: string
  disabled?: boolean
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  categoryName,
  onConfirm,
  iconClassName,
  disabled = false,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async (onCloseModal: VoidFunction) => {
    try {
      setIsSubmitting(true)
      const result = await onConfirm()
      if (result !== false) {
        onCloseModal()
      }
    } catch (error) {
      console.error("Failed to delete category:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ModalComponent
      title="Delete Category"
      renderTriggerredButton={onOpenModal => (
        <IconButton
          aria-label="Delete category"
          className={cn(styles.iconButton, {
            [iconClassName ?? ""]: Boolean(iconClassName),
          })}
          disabled={disabled || isSubmitting}
          onClick={onOpenModal}>
          <DeleteOutlineIcon />
        </IconButton>
      )}
      renderContent={onCloseModal => (
        <div>
          <p className={styles.modalText}>
            Are you sure you want to delete “{categoryName}”? This action cannot
            be undone.
          </p>
          <div className={styles.modalControls}>
            <Button
              className={styles.modalButton}
              disabled={isSubmitting}
              onClick={() => handleConfirm(onCloseModal)}
              variant="contained"
              color="error">
              Delete
            </Button>
            <Button
              className={styles.modalButton}
              disabled={isSubmitting}
              onClick={onCloseModal}
              variant="outlined">
              Cancel
            </Button>
          </div>
        </div>
      )}
    />
  )
}

export default DeleteCategoryModal
