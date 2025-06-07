import type React from "react"

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { IconButton, Button } from "@mui/material"
import cn from "classnames"

import ModalComponent from "../ModalComponent"

import styles from "./styles.module.scss"

interface DeleteCardModalProps {
  onDeleteCard: VoidFunction
  deleteIconClassName?: string
  isWording?: boolean
  btnClassName?: string
}

const DeleteCardModal: React.FC<DeleteCardModalProps> = ({
  onDeleteCard,
  deleteIconClassName,
  isWording,
  btnClassName = "",
}) => {
  return (
    <ModalComponent
      title="Delete Card"
      renderTriggerredButton={onOpenModal =>
        isWording ? (
          <button
            className={cn("button-regular-text", btnClassName)}
            onClick={onOpenModal}>
            Delete
          </button>
        ) : (
          <IconButton
            className={cn({
              [deleteIconClassName ?? ""]: Boolean(deleteIconClassName),
            })}
            onClick={onOpenModal}>
            <DeleteOutlineIcon />
          </IconButton>
        )
      }
      renderContent={onCloseModal => (
        <div>
          <div className={styles["modal__text"]}>
            Are you sure you want to delete this card?
          </div>
          <div className={styles["modal-controls"]}>
            <Button
              className={styles["modal__btn"]}
              onClick={onDeleteCard}
              variant="outlined">
              Yes
            </Button>
            <Button
              className={styles["modal__btn"]}
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

export default DeleteCardModal
