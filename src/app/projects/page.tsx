"use client";

import React from "react";

import Link from "next/link";

import Button from "@/components/Button";
import { PROJECTS_PAGE_MAP } from "@/constants/app";
import { useCounterStore } from "@/store/counterStore";
import { useThemeStore } from "@/store/themeStore";

import styles from "./styles.module.scss";

const ProjectsPage: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div>
      <h1>Projects</h1>
      <p>This is a projects page</p>

      <section className={styles["projects__counter"]}>
        <h2>Theme Store</h2>
        <p>
          <span>{"Current theme: "}</span>
          <span className={styles.value}>{theme}</span>
        </p>
        <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Toggle Theme
        </Button>
      </section>

      <section>
        <h2>Counter Store</h2>
        <p>
          <span>{"Count: "}</span>
          <span className={styles.value}>{count}</span>
        </p>
        <div className={styles["projects__counter__controls"]}>
          <Button onClick={increment}>Increment</Button>
          <Button onClick={decrement}>Decrement</Button>
        </div>
      </section>

      <ul>
        {Object.entries(PROJECTS_PAGE_MAP).map(([slug, { title }]) => (
          <li key={slug}>
            <Link href={`/projects/${slug}`}>{title}</Link>
          </li>
        ))}
        {/* <li>
          <Link href="/projects/demo">Demo</Link>
        </li>
        <li>
          <Link href="/projects/cms">CMS</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default ProjectsPage;
