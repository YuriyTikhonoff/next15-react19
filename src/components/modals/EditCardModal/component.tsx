import type React from "react"

import EditIcon from "@mui/icons-material/Edit"
import { IconButton } from "@mui/material"
import cn from "classnames"

import type { MemoCard } from "@/types/app"

import AddNewCard from "../../AddNewCard"
import ModalComponent from "../ModalComponent"

interface EditCardModalProps {
  editIconClassName?: string
  initialCardValues: MemoCard
  onAddNewCard: (newCard: MemoCard) => void
}

const EditCardModal: React.FC<EditCardModalProps> = ({
  editIconClassName,
  initialCardValues,
  onAddNewCard,
}) => {
  return (
    <ModalComponent
      renderContent={onCloseModal => (
        <AddNewCard
          initialCardValues={initialCardValues}
          onAddNewCard={onAddNewCard}
          onClose={onCloseModal}
        />
      )}
      renderTriggerredButton={onOpenModal => (
        <IconButton
          className={cn({
            [editIconClassName ?? ""]: Boolean(editIconClassName),
          })}
          onClick={onOpenModal}>
          <EditIcon />
        </IconButton>
      )}
      title={<h3>Edit Card Component</h3>}
    />
  )
}

export default EditCardModal
