"use client";

import React from "react";
import { useThemeStore } from "@/store/themeStore";
import { useCounterStore } from "@/store/counterStore";
import styles from "./styles.module.scss";
import Button from "@/components/Button";

const SendMessagePage: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div>
      <h1>Send Message</h1>
      <p>This is the send message page.</p>
      <div className={styles["data-modification"]}>
        <div className={styles.theme}>
          <div>
            <span>{`The current theme is `}</span>
            <span className={styles.value}>{theme}</span>
          </div>

          <div className={styles.theme__controls}>
            <Button onClick={handleChangeTheme}>Change Theme</Button>
          </div>
        </div>
        <div className={styles.counter}>
          <div>
            <span>{`The current count is `}</span>
            <span className={styles.value}>{count}</span>
          </div>
          <div className={styles.counter__controls}>
            <Button onClick={increment}>Increment</Button>
            <Button onClick={decrement}>Decrement</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessagePage;
