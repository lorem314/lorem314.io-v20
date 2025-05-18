"use client"

import { useState, useCallback } from "react"
import { twMerge } from "tailwind-merge"
import { IoMdSearch } from "react-icons/io"
import { VscChromeClose } from "react-icons/vsc"

import Modal from "../ui/Modal"
import Input from "../ui/Input"
import Button from "../ui/Button"

const Search = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <>
      <div
        className={twMerge(
          "flex grow-1 items-center justify-end",
          "sm:justify-center",
        )}
      >
        <button
          className={twMerge(
            "flex cursor-pointer items-center gap-1.5 rounded p-2 transition-colors",
            "bg-black/10 dark:bg-white/10",
            "hover:bg-black/20 dark:hover:bg-white/20",
            "active:bg-black/30 dark:active:bg-white/30",
            "sm:basis-md sm:rounded-full sm:px-2.5 sm:py-1 sm:text-sm",
          )}
          onClick={handleOpen}
        >
          <IoMdSearch />
          <div
            className={twMerge(
              "hidden",
              "sm:flex sm:grow-1 sm:justify-between sm:gap-1",
            )}
          >
            <div className="">搜索</div>
            <div className="">
              <kbd>Ctrl</kbd>
              <kbd>K</kbd>
            </div>
          </div>
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        {({ onCloseModal }) => {
          return (
            <div
              className={twMerge(
                "bg-content-bg grow cursor-auto overflow-hidden p-4",
                "flex flex-col gap-2.5",
                "lg:my-8 lg:max-w-3xl lg:items-center lg:rounded-lg",
                "",
              )}
              onClick={(event) => event.stopPropagation()}
            >
              <header className="flex w-full items-center gap-2.5">
                <Input type="search" placeholder="全局搜索..." />
                <Button
                  variant="icon"
                  className="size-12 bg-black/10 dark:bg-white/10"
                >
                  <VscChromeClose />
                </Button>
              </header>
              <ul className="overflow-y-auto">
                {Array(40)
                  .fill(null)
                  .map((_, index) => {
                    return (
                      <li key={index}>
                        {index} - Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Magnam quidem recusandae accusamus
                        perferendis?
                      </li>
                    )
                  })}
              </ul>
              <footer>
                <div>footer</div>
              </footer>
            </div>
          )
        }}
      </Modal>
    </>
  )
}

export default Search
