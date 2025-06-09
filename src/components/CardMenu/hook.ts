import React from "react"

const useContainer = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const isOpen = Boolean(anchorEl)
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return {
    isOpen,
    anchorEl,
    handleOpenMenu,
    handleClose,
  }
}

export default useContainer
