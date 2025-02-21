import React from "react"
import { useThemeStore } from "@/store/themeStore"

interface ProjectPageProps {
  params: Promise<{ projectName: string }>
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
