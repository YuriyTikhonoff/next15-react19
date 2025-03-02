import Button from "../Button";

import styles from "./styles.module.scss";

const AddNewCard: React.FC = () => {
  return (
    <div className={styles["add-new-card"]}>
      <h3>Add New Card Component</h3>
      <div>
        <input type="text" placeholder="Title" />
        <textarea placeholder="Description" />
        <Button>Add Card</Button>
      </div>
    </div>
  );
};

export default AddNewCard;
