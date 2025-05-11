"use client"

import { type ChangeEvent, useRef } from "react"

import Input from "../ui/Input"

export default function Search({
  value,
  onChange,
}: {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <section>
      <h2 className="content-title">
        <label htmlFor="blog-search">搜索标题</label>
      </h2>
      <Input
        ref={ref}
        type="search"
        id="blog-search"
        placeholder="搜索标题..."
        variant="base"
        value={value}
        autoComplete="off"
        onChange={onChange}
      />
    </section>
  )
}
