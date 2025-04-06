import React from "react"

import { PROJECTS_PAGE_SLUGS } from "@/constants/app"
import { useThemeStore } from "@/store/themeStore"

interface ProjectPageProps {
  params: Promise<{ projectName: string }>
}

export function generateStaticParams() {
  const params = Object.keys(PROJECTS_PAGE_SLUGS).map(projectName => ({
    projectName:
      PROJECTS_PAGE_SLUGS[projectName as keyof typeof PROJECTS_PAGE_SLUGS],
  }))

  return params
}

const ProjectPage: React.FC<ProjectPageProps> = async ({ params }) => {
  const projectName = (await params).projectName
  const { theme } = useThemeStore.getState()
  console.log(projectName)
  return (
    <div>
      <h1>{projectName}</h1>
      <p>This is a page for a specific project: {projectName} </p>
      <div>{`The current theme is ${theme}`}</div>
    </div>
  )
}

export default ProjectPage
