"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { twMerge } from "tailwind-merge"
import { IoCloseSharp } from "react-icons/io5"
import { FaRegTrashAlt } from "react-icons/fa"
import { GiLogicGateAnd, GiLogicGateOr } from "react-icons/gi"
import { FaCaretDown } from "react-icons/fa"
import type { ChangeEvent, MouseEvent } from "react"

import Input, { input } from "../ui/Input"
import Button from "../ui/Button"
import useDebounce from "@/hooks/useDebounce"
import type { Tag } from "@/types"

export default function Select({
  options,
  selectedTags,
  onSelectTag,
  clearSelectedTags,
  isOrMode,
  toggleFilterMode,
}: {
  options: Tag[]
  selectedTags: Tag[]
  onSelectTag: (tag: Tag) => (event: MouseEvent | KeyboardEvent) => void
  clearSelectedTags: () => void
  isOrMode: boolean
  toggleFilterMode: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  const refSelectedTags = useRef<HTMLUListElement>(null)
  const refTagInput = useRef<HTMLInputElement>(null)
  const refOptions = useRef<HTMLUListElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query)

  // close ul.options when click outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false)
    }
    window.addEventListener("click", handleClickOutside)
    return () => {
      window.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  // nodeSelectedTags horizontal wheel
  useEffect(() => {
    const nodeSelectedTags = refSelectedTags.current

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return
      nodeSelectedTags?.scrollBy({ left: event.deltaY < 0 ? -12 : 12 })
    }

    if (nodeSelectedTags) {
      nodeSelectedTags.addEventListener("wheel", handleWheel, { passive: true })
    }

    return () => {
      if (nodeSelectedTags) {
        nodeSelectedTags.removeEventListener("wheel", handleWheel)
      }
    }
  }, [selectedTags])

  const handleSelectTag = useCallback(
    (tag: Tag) => (event: MouseEvent | KeyboardEvent) => {
      if (event.stopPropagation) {
        event.stopPropagation()
      }
      if (!event.shiftKey) {
        setIsOpen(false)
      }
      setQuery("")
      onSelectTag(tag)(event)
    },
    [onSelectTag],
  )

  const filteredOptions = useMemo(
    () =>
      options.filter((option) => {
        if (debouncedQuery === "") return true
        const lowercasedDebouncedQuery = debouncedQuery.toLocaleLowerCase()
        const lowercasedTagName = option.name.toLocaleLowerCase()
        return lowercasedTagName.includes(lowercasedDebouncedQuery)
      }),
    [debouncedQuery, options],
  )

  // tag input listens to key press event
  useEffect(() => {
    const nodeTagInput = refTagInput.current

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target !== nodeTagInput) return
      switch (event.code) {
        case "Escape":
          setIsOpen(false)
          break
        case "Enter":
        case "NumpadEnter":
        case "Space":
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            const hoveredOption = filteredOptions[hoveredIndex]
            if (hoveredIndex !== -1 && hoveredOption) {
              handleSelectTag(hoveredOption)(event)
            }
            setIsOpen(false)
          }
          break
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          if (hoveredIndex === -1) {
            setHoveredIndex(() => 0)
          }
          const indexAddend = event.code === "ArrowDown" ? 1 : -1
          const newHoveredIndex = hoveredIndex + indexAddend
          if (newHoveredIndex >= 0 && newHoveredIndex < options.length) {
            setHoveredIndex(newHoveredIndex)
            const nodeOptions = refOptions.current
            const nodeNextHoveredLi = nodeOptions?.querySelector<HTMLLIElement>(
              `li:nth-of-type(${newHoveredIndex + 1})`,
            )
            if (!nodeNextHoveredLi || !nodeOptions) return
            if (event.code === "ArrowUp") {
              if (nodeNextHoveredLi.offsetTop < nodeOptions.scrollTop) {
                nodeOptions.scrollTop = nodeNextHoveredLi.offsetTop
              }
            } else if (event.code === "ArrowDown") {
              if (
                nodeNextHoveredLi.offsetTop + nodeNextHoveredLi.offsetHeight >
                nodeOptions.scrollTop + nodeOptions.clientHeight
              ) {
                nodeOptions.scrollTop =
                  (newHoveredIndex - 3) * nodeNextHoveredLi.offsetHeight
              }
            }
          }
          return
        default:
          return
      }
    }

    if (nodeTagInput) {
      nodeTagInput.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      if (nodeTagInput) {
        nodeTagInput.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [
    isOpen,
    hoveredIndex,
    options,
    selectedTags,
    handleSelectTag,
    clearSelectedTags,
    filteredOptions,
  ])

  const handleMouseEnterOption = useCallback(
    (index: number) => () => setHoveredIndex(index),
    [],
  )

  const handleMouseLeaveOptions = useCallback(() => setHoveredIndex(-1), [])

  const handleChangeQuery = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setHoveredIndex(-1)
      setQuery(event.target.value)
      setIsOpen(true)
    },
    [],
  )

  const toggleIsOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      setIsOpen((prevIsOpen) => !prevIsOpen)
    },
    [],
  )

  return (
    <section className="relative">
      <h2 className="content-title">
        <label htmlFor="blog-select">
          筛选标签
          {selectedTags.length !== 0 ? `(${selectedTags.length})` : null}
        </label>
      </h2>

      <div
        className={twMerge(
          input({ variant: "base" }),
          "flex items-center px-0 py-0",
        )}
      >
        {selectedTags.length !== 0 ? (
          <ul
            ref={refSelectedTags}
            className="flex max-w-36 shrink-0 items-center gap-2 overflow-x-hidden pl-2"
          >
            {selectedTags.map((selectedTag) => {
              return (
                <li key={selectedTag.name}>
                  <Button
                    className="leading-6.5"
                    size="small"
                    onClick={handleSelectTag(selectedTag)}
                  >
                    {selectedTag.name}
                  </Button>
                </li>
              )
            })}
          </ul>
        ) : null}

        <Input
          ref={refTagInput}
          id="blog-select"
          variant="goast"
          type="text"
          placeholder="筛选标签..."
          value={query}
          autoComplete="off"
          onChange={handleChangeQuery}
          onFocus={() => setIsOpen(true)}
          onClick={(event) => event.stopPropagation()}
        />

        <div className="flex items-center">
          <Button variant="icon" size="small" onClick={() => setQuery("")}>
            <IoCloseSharp />
          </Button>
          <Button variant="icon" size="small" onClick={clearSelectedTags}>
            <FaRegTrashAlt />
          </Button>
          <Button variant="icon" size="small" onClick={toggleFilterMode}>
            {isOrMode ? <GiLogicGateOr /> : <GiLogicGateAnd />}
          </Button>
          <Button variant="icon" size="small" onClick={toggleIsOpen}>
            <FaCaretDown />
          </Button>
        </div>
      </div>

      <ul
        ref={refOptions}
        className={twMerge(
          "bg-content-bg absolute top-full mt-2.5 max-h-32 w-full",
          "rounded border border-neutral-400",
          "overflow-y-auto transition-colors",
          isOpen ? "block" : "hidden",
        )}
        onClick={(event) => event.stopPropagation()}
        onMouseLeave={handleMouseLeaveOptions}
      >
        {filteredOptions.length === 0 ? (
          <li className="flex h-8 items-center justify-center px-2 opacity-60">
            没有符合查询的标签...
          </li>
        ) : (
          filteredOptions.map((option, index) => {
            const parts = option.name.split(new RegExp(`(${query})`, "gi"))
            const isHovered = index === hoveredIndex
            const isSelected = selectedTags.includes(option)

            return (
              <li
                key={option.name}
                className={twMerge(
                  "flex h-8 cursor-pointer items-center justify-between px-2",
                  isHovered ? "bg-bg-0" : null,
                  isSelected ? "bg-sky-600 text-white" : null,
                  isSelected ? "dark:bg-blue-300 dark:text-black" : null,
                )}
                onMouseEnter={handleMouseEnterOption(index)}
                onClick={handleSelectTag(option)}
              >
                <div>
                  {parts.map((part, index) => {
                    return part.toLocaleLowerCase() === query.toLowerCase() ? (
                      <span key={index} style={{ color: "red" }}>
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  })}
                </div>
                <div>{option.count}</div>
              </li>
            )
          })
        )}
      </ul>
    </section>
  )
}
