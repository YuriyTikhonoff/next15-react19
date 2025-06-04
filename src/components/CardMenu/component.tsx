"use client"

import * as React from "react"

import MenuIcon from "@mui/icons-material/Menu"
import { IconButton } from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import DeleteCardModal from "../modals/DeleteCardModal"

interface CardMenuProps {
  onDeleteCard: VoidFunction
  onIncreaseCardLevel: VoidFunction
}

const CardMenu: React.FC<CardMenuProps> = ({
  onDeleteCard,
  onIncreaseCardLevel,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}>
        <MenuItem onClick={onIncreaseCardLevel}>Increase Level</MenuItem>
        <MenuItem>
          <DeleteCardModal onDeleteCard={onDeleteCard} />
        </MenuItem>
      </Menu>
    </div>
  )
}

export default CardMenu
