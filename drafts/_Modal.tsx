"use client"

import { useState, useEffect, cloneElement, memo } from "react"
import type { ReactElement } from "react"
import { createPortal } from "react-dom"
import { twMerge } from "tailwind-merge"

import { VscChromeClose } from "react-icons/vsc"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children:
    | ReactElement
    | (({ onCloseModal }: { onCloseModal?: () => void }) => ReactElement)
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return isOpen ? <Portal onClose={onClose}>{children}</Portal> : null
}

export default Modal

const Portal = ({ onClose, children }: Omit<ModalProps, "isOpen">) => {
  const handleCloseModal = () => {
    onClose()
  }

  return createPortal(
    <div
      className={twMerge(
        "cursor-pointer overflow-y-auto bg-black/25 backdrop-blur-xs",
        "fixed inset-0 h-screen w-screen",
        "flex justify-center",
      )}
      role="button"
      onClick={handleCloseModal}
    >
      <div
        className={twMerge(
          "bg-content-bg cursor-auto overflow-y-auto",
          "lg:my-8 lg:max-w-3xl lg:items-center lg:rounded-lg",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {typeof children === "function"
          ? children({ onCloseModal: handleCloseModal })
          : cloneElement(children as ReactElement<any>, {
              onCloseModal: handleCloseModal,
            })}
      </div>
    </div>,
    document.body,
  )
}
