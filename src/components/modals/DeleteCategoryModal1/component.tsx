import type React from "react"

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"

import ConfirmationModal from "../ConfirmationModal"

interface DeleteCategoryModalProps {
  categoryName: string
  onConfirm: () => Promise<boolean> | boolean
  iconClassName?: string
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  onConfirm: onDeleteCard,
  iconClassName,
  categoryName,
}) => {
  return (
    <ConfirmationModal
      onConfirm={onDeleteCard}
      title={`Delete Category "${categoryName}"`}
      text={`Are you sure you want to delete the category "${categoryName}"?`}
      actionWording="Delete"
      iconClassName={iconClassName}
      icon={<DeleteOutlineIcon />}
    />
  )
}

export default DeleteCategoryModal
