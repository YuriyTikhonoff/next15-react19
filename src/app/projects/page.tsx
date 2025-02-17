"use client"

import { DataContext } from "@/layouts/MainLayout/component"
import Link from "next/link"
import React, { useContext } from "react"

const ProjectsPage: React.FC = () => {
  const data = useContext(DataContext)
  console.log("theme ", data.theme)

  return (
    <div>
      <h1>Projects</h1>
      <p>This is a projects page </p>
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
