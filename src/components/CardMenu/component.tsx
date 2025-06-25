"use client"

import * as React from "react"

import MenuIcon from "@mui/icons-material/Menu"
import { IconButton } from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import { MemoCard } from "@/types/app"

import DeleteCardModal from "../modals/DeleteCardModal"

import useContainer from "./hook"
import styles from "./styles.module.scss"

interface CardMenuProps {
  card: MemoCard
  onDeleteCard: VoidFunction
  onIncreaseCardLevel: VoidFunction
  onUpdateCard: (updatedCard: MemoCard) => void
}

const CardMenu: React.FC<CardMenuProps> = ({
  onDeleteCard,
  onIncreaseCardLevel,
  onUpdateCard,
  card,
}) => {
  const {
    isOpen,
    anchorEl,
    handleOpenMenu,
    handleClose,
    handleToggleDefaultBackSide,
  } = useContainer({
    onUpdateCard,
    card,
  })

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
        <MenuItem onClick={handleToggleDefaultBackSide}>{`Make ${
          card.useReversedDefaultView ? "front" : "back"
        } as default side`}</MenuItem>
      </Menu>
    </div>
  )
}

export default CardMenu
