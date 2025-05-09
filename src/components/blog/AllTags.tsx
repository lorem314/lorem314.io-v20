"use client"

import type { MouseEvent } from "react"

import Button from "../ui/Button"
import { Tag } from "@/types"

export default function AllTags({
  allTags,
  selectedTags,
  handleSelectTag,
}: {
  allTags: Tag[]
  selectedTags: Tag[]
  handleSelectTag: (tag: Tag) => (event: MouseEvent | KeyboardEvent) => void
}) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {allTags.map((tag, index) => {
        const isSelected = selectedTags.includes(tag)
        return (
          <li key={index}>
            <Button
              variant={isSelected ? "contained" : "outline"}
              onClick={handleSelectTag(tag)}
            >
              {tag.name}
            </Button>
          </li>
        )
      })}
    </ul>
  )
}
