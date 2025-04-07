import type React from "react"

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { IconButton, Button } from "@mui/material"
import cn from "classnames"

import ModalComponent from "../ModalComponent"

import styles from "./styles.module.scss"

interface DeleteCardModalProps {
  onDeleteCard: VoidFunction
  deleteIconClassName?: string
}

const DeleteCardModal: React.FC<DeleteCardModalProps> = ({
  onDeleteCard,
  deleteIconClassName,
}) => {
  return (
    <ModalComponent
      title="Delete Card"
      renderTriggerredButton={onOpenModal => (
        <IconButton
          className={cn({
            [deleteIconClassName ?? ""]: Boolean(deleteIconClassName),
          })}
          onClick={onOpenModal}>
          <DeleteOutlineIcon />
        </IconButton>
      )}
      renderContent={onCloseModal => (
        <div>
          <div className={styles["modal__text"]}>
            Are you sure you want to delete this card?
          </div>
          <div className={styles["modal-controls"]}>
            <Button onClick={onDeleteCard} variant="outlined">
              Yes
            </Button>
            <Button onClick={onCloseModal} variant="outlined">
              No
            </Button>
          </div>
        </div>
      )}
    />
  )
}

export default DeleteCardModal
