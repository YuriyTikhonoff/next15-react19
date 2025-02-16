import Link from "next/link"
import React from "react"

const ProjectsPage: React.FC = () => {
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
