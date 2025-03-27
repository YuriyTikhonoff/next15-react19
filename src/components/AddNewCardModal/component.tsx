import type { MemoCard } from "@/types/app";
import AddNewCard from "../AddNewCard";
import ModalComponent from "../ModalComponent";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";
import type React from "react";

interface AddNewCardModalProps {
  onAddNewCard: (newCard: MemoCard) => void;
}

const AddNewCardModal: React.FC<AddNewCardModalProps> = ({ onAddNewCard }) => {
  return (
    <ModalComponent
      title={<h3>Add New Card Component</h3>}
      renderTriggerredButton={(onOpenModal) => (
        <IconButton onClick={onOpenModal}>
          <AddBoxIcon />
        </IconButton>
      )}
      renderContent={(onCloseModal) => (
        <AddNewCard onAddNewCard={onAddNewCard} onClose={onCloseModal} />
      )}
    />
  );
};

export default AddNewCardModal;
