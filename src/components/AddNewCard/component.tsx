import { Button, MenuItem, TextField } from "@mui/material";

import styles from "./styles.module.scss";

const AddNewCard: React.FC = () => {
  const categories = ["Category 1", "Category 2", "Category 3"];
  return (
    <div className={styles["add-new-card"]}>
      <h3>Add New Card Component</h3>
      <div className={styles["add-new-card__form"]}>
        <TextField label="Front side" variant="outlined" />
        <TextField label="Rare side" variant="outlined" />
        <div className={styles["add-new-card__category"]}>
          <TextField
            label="Category"
            variant="outlined"
            select
            style={{ width: 200 }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField label="New Category" variant="outlined" />
          <Button variant="outlined">Add Category</Button>
        </div>
        <Button style={{ width: 200, height: 60 }} variant="outlined">
          Add Card
        </Button>
      </div>
    </div>
  );
};

export default AddNewCard;
