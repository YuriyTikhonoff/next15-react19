"use client"

import * as React from "react"

import MenuIcon from "@mui/icons-material/Menu"
import { IconButton } from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import DeleteCardModal from "../modals/DeleteCardModal"

import useContainer from "./hook"
import styles from "./styles.module.scss"
import { MemoCard } from "@/types/app"

interface CardMenuProps {
  card: MemoCard
  onDeleteCard: VoidFunction
  onIncreaseCardLevel: VoidFunction
}

const CardMenu: React.FC<CardMenuProps> = ({
  onDeleteCard,
  onIncreaseCardLevel,
  card,
}) => {
  const { isOpen, anchorEl, handleOpenMenu, handleClose } = useContainer()

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={isOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={handleOpenMenu}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}>
        <MenuItem onClick={onIncreaseCardLevel}>Increase Level</MenuItem>
        <MenuItem>
          <DeleteCardModal
            btnClassName={styles["card-menu__delete-btn"]}
            isWording
            onDeleteCard={onDeleteCard}
          />
        </MenuItem>
        <MenuItem onClick={onIncreaseCardLevel}>{`Make ${
          card.useReversedDefaultView ? "front" : "back"
        } as default side`}</MenuItem>
      </Menu>
    </div>
  )
}

export default CardMenu
