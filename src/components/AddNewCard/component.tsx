import { Button, TextField } from "@mui/material";

import styles from "./styles.module.scss";

const AddNewCard: React.FC = () => {
  return (
    <div className={styles["add-new-card"]}>
      <h3>Add New Card Component</h3>
      <div>
        <TextField label="Title" variant="outlined" />
        <TextField label="Description" variant="standard" />
        <Button>Add Card</Button>
      </div>
    </div>
  );
};

export default AddNewCard;
