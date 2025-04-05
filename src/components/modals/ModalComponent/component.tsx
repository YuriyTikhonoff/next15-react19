import type React from "react"
import { useState } from "react"

import CloseIcon from "@mui/icons-material/Close"
import { IconButton, Modal } from "@mui/material"

import styles from "./styles.module.scss"


interface ModalComponentProps {
  title?: React.ReactNode
  renderContent: (onCloseModal: VoidFunction) => React.ReactNode
  renderTriggerredButton?: (onOpenModal: VoidFunction) => React.ReactNode
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  title,
  renderContent,
  renderTriggerredButton,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const onOpenModal = () => setIsModalOpen(true)
  const onCloseModal = () => setIsModalOpen(false)

  return (
    <>
      {renderTriggerredButton?.(onOpenModal)}
      <Modal
        open={isModalOpen}
        onClose={onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles["modal-overlay"]}>
        <div className={styles["modal"]}>
          <div className={styles["modal-close-btn"]}>
            <IconButton onClick={onCloseModal}>
              <CloseIcon />
            </IconButton>
          </div>
          {title ? <div>{title}</div> : null}
          {renderContent(onCloseModal)}
        </div>
      </Modal>
    </>
  )
}

export default ModalComponent
