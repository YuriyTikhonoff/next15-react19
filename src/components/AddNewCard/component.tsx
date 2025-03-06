import { Button, TextField } from "@mui/material";

import styles from "./styles.module.scss";

const AddNewCard: React.FC = () => {
  return (
    <div className={styles["add-new-card"]}>
      <h3>Add New Card Component</h3>
      <div className={styles["add-new-card__form"]}>
        <TextField label="Front side" variant="outlined" />
        <TextField label="Rare side" variant="outlined" />
        <Button>Add Card</Button>
      </div>
    </div>
  );
};

export default AddNewCard;
