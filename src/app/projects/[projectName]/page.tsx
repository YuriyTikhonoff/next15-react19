import React from "react"

interface ProjectPageProps {
  params: Promise<{ projectName: string }>
}

const ProjectPage: React.FC<ProjectPageProps> = async ({ params }) => {
  const projectName = (await params).projectName
  console.log(projectName)
  return (
    <div>
      <h1>{projectName}</h1>
      <p>This is a page for a specific project: {projectName} </p>
    </div>
  )
}

export default ProjectPage
