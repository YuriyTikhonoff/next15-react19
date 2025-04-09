import { useState, useCallback } from "react"

export const useModalContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onOpenModal = useCallback(() => setIsModalOpen(true), [])
  const onCloseModal = useCallback(() => setIsModalOpen(false), [])

  return {
    isModalOpen,
    onOpenModal,
    onCloseModal,
  }
}

export default useModalContainer
