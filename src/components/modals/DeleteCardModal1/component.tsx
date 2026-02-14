import type React from "react"

import ConfirmationModal from "../ConfirmationModal"

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
    <ConfirmationModal
      onConfirm={onDeleteCard}
      title="Delete Card"
      text="Are you sure you want to delete this card$$$$?"
      actionWording="Delete"
      iconClassName={deleteIconClassName}
      isWording={isWording}
      btnClassName={btnClassName}
    />
  )
}

export default DeleteCardModal
