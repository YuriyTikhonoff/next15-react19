"use client"

import { DataContext } from "@/layouts/MainLayout/component"
import Link from "next/link"
import React, { useContext } from "react"
import {useStore} from "@/store"

const ProjectsPage: React.FC = () => {
  const data = useContext(DataContext)
  const theme = useStore(state => state.theme)
  const setTheme = useStore(state => state.setTheme)
  
  console.log("theme from context: ", data.theme)
  console.log("theme from zustand: ", theme)
  
  return (
    <div>
      <h1>Projects</h1>
      <p>This is a projects page</p>
      <p>Current theme (zustand): {theme}</p>
      <button onClick={() => setTheme("")}>Toggle Theme</button>
      <ul>
        <li>
          <Link href={"/projects/demo"}>Demo</Link>
        </li>
        <li>
          <Link href={"/projects/cms"}>CMS</Link>
        </li>
      </ul>
    </div>
  )
}

export default ProjectsPage
