"use client"

import React from "react"
import Link from "next/link"
import { useThemeStore } from "@/store/themeStore"
import { useCounterStore } from "@/store/counterStore"

const ProjectsPage: React.FC = () => {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)

  return (
    <div>
      <h1>Projects</h1>
      <p>This is a projects page</p>
      
      <section>
        <h2>Theme Store</h2>
        <p>Current theme: {theme}</p>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Toggle Theme
        </button>
      </section>
      
      <section>
        <h2>Counter Store</h2>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </section>
      
      <ul>
        <li>
          <Link href="/projects/demo">Demo</Link>
        </li>
        <li>
          <Link href="/projects/cms">CMS</Link>
        </li>
      </ul>
    </div>
  )
}

export default ProjectsPage
