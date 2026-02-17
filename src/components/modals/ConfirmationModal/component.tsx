import type React from "react"

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { IconButton, Button } from "@mui/material"
import cn from "classnames"

import ModalComponent from "../ModalComponent"

import styles from "./styles.module.scss"

interface ConfirmationModalProps {
  onConfirm: VoidFunction
  title: string
  text: string
  actionWording: string
  iconClassName?: string
  isWording?: boolean
  btnClassName?: string
  icon?: React.ReactElement
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  title,
  text,
  iconClassName,
  isWording,
  actionWording,
  btnClassName = "",
  icon,
}) => {
  return (
    <ModalComponent
      title={title}
      renderTriggerredButton={onOpenModal =>
        isWording ? (
          <button
            className={cn("button-regular-text", btnClassName)}
            onClick={onOpenModal}>
            {actionWording}
          </button>
        ) : (
          <IconButton
            className={cn({
              [iconClassName ?? ""]: Boolean(iconClassName),
            })}
            onClick={onOpenModal}>
            {icon ?? <DeleteOutlineIcon />}
          </IconButton>
        )
      }
      renderContent={onCloseModal => (
        <div>
          <div className={styles["modal__text"]}>{text}</div>
          <div className={styles["modal-controls"]}>
            <Button
              className={styles["modal__btn"]}
              onClick={onConfirm}
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

export default ConfirmationModal
