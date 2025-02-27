import React from "react";
import styles from "./styles.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
