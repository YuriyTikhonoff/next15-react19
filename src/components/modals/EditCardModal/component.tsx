import type React from "react"

import EditIcon from "@mui/icons-material/Edit"
import { IconButton } from "@mui/material"
import cn from "classnames"

import type { MemoCard } from "@/types/app"

import AddNewCard from "../../AddNewCard"
import ModalComponent from "../ModalComponent"



interface EditCardModalProps {
  onAddNewCard: (newCard: MemoCard) => void
  editIconClassName?: string
  initialCardValues: MemoCard
}

const EditCardModal: React.FC<EditCardModalProps> = ({
  onAddNewCard,
  editIconClassName,
  initialCardValues,
}) => {
  return (
    <ModalComponent
      title={<h3>Edit Card Component</h3>}
      renderTriggerredButton={onOpenModal => (
        <IconButton
          className={cn({
            [editIconClassName ?? ""]: Boolean(editIconClassName),
          })}
          onClick={onOpenModal}>
          <EditIcon />
        </IconButton>
      )}
      renderContent={onCloseModal => (
        <AddNewCard
          onAddNewCard={onAddNewCard}
          onClose={onCloseModal}
          initialCardValues={initialCardValues}
        />
      )}
    />
  )
}

export default EditCardModal
