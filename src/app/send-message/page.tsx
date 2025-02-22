"use client";

import React from "react";
import { useThemeStore } from "@/store/themeStore";
import { useCounterStore } from "@/store/counterStore";
import styles from "./styles.module.scss";

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
          <div className={styles.theme}>{`The current theme is ${theme}`}</div>
          <div className={styles.theme__controls}>
            <button onClick={handleChangeTheme}>Change Theme</button>
          </div>
        </div>
        <div className={styles.counter}>
          <div>{`The current count is ${count}`}</div>
          <div className={styles.counter__controls}>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessagePage;
