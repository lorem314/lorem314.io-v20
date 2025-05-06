"use client"

import { useState, useEffect, cloneElement, memo } from "react"
import { createPortal } from "react-dom"
import { twMerge } from "tailwind-merge"
import { VscChromeClose } from "react-icons/vsc"

import type { ReactElement } from "react"
import type { Placement } from "@/types"

type DrawerProps = {
  isOpen: boolean
  title?: string
  placement: Placement
  size: number
  onClose: () => void
  children:
    | ReactElement
    | (({ onCloseDrawer }: { onCloseDrawer?: () => void }) => ReactElement)
}

const Drawer = ({
  isOpen,
  title,
  placement = "left",
  size,
  onClose,
  children,
}: DrawerProps) => {
  return isOpen ? (
    <Portal title={title} placement={placement} size={size} onClose={onClose}>
      {children}
    </Portal>
  ) : null
}

export default memo(Drawer)

const Portal = ({
  title,
  placement,
  size,
  onClose,
  children,
}: Omit<DrawerProps, "isOpen">) => {
  const [style, setStyle] = useState({
    opacity: 0,
    transform: getTransform(placement),
  })

  useEffect(() => {
    const transform = "translate(0, 0)"
    setStyle({ opacity: 1, transform })
  }, [])

  const handleCloseDrawer = () => {
    Promise.resolve()
      .then(() => {
        return new Promise<void>((resolve) => {
          const transform = getTransform(placement)
          setStyle({ opacity: 0, transform })
          setTimeout(() => resolve(), 150)
        })
      })
      .then(() => onClose && onClose())
  }

  const { transform, opacity } = style
  const positionProps = getPositionProps(placement, size)

  return createPortal(
    <div
      className="absolute inset-0 bg-black/25 backdrop-blur-xs transition-opacity"
      style={{ opacity }}
      onClick={handleCloseDrawer}
    >
      <div
        className="absolute flex flex-col transition-transform"
        style={{ ...positionProps, transform }}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <header
          className={twMerge(
            "bg-primary-color flex h-12.5 shrink-0 items-center gap-2.5 px-2.5 text-white",
            placement === "left"
              ? "flex-row-reverse justify-end"
              : "flex-row justify-between",
          )}
        >
          <h2 className="font-bold">{title ? title : "lorem314.io"}</h2>
          <button
            className={twMerge(
              "rounded p-2 transition-colors",
              "bg-black/10 dark:bg-white/10",
              "hover:bg-black/20 dark:hover:bg-white/20",
              "active:bg-black/30 dark:active:bg-white/30",
            )}
            onClick={handleCloseDrawer}
          >
            <VscChromeClose />
          </button>
        </header>
        <div className="grow overflow-y-auto bg-amber-200">
          {typeof children === "function"
            ? children({ onCloseDrawer: handleCloseDrawer })
            : cloneElement(children as ReactElement<any>, {
                onCloseDrawer: handleCloseDrawer,
              })}
        </div>
      </div>
    </div>,
    document.body,
  )
}

const getPositionProps = (placement: Placement, size: number) => {
  switch (placement) {
    case "top":
    case "bottom":
      return { left: 0, right: 0, [placement]: 0, height: `${size}px` }
    case "left":
    case "right":
      return { top: 0, bottom: 0, [placement]: 0, width: `${size}px` }
    default:
      return { top: 0, bottom: 0, left: 0, width: `${size}px` }
  }
}

const getTransform = (placement: Placement) => {
  switch (placement) {
    case "top":
      return "translate(0, -100%)"
    case "right":
      return "translate(100%, 0)"
    case "bottom":
      return "translate(0, 100%)"
    case "left":
      return "translate(-100%, 0)"
    default:
      return "translate(-100%, 0)"
  }
}
