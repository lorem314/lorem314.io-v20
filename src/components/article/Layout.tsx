"use client"

import type { ReactNode } from "react"

import Actions from "./Actions"

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="relative mx-auto my-8 grid max-w-[82rem] grid-cols-[2rem_minmax(0,_auto)_minmax(0,_24rem)] gap-2.5">
      <Actions />

      {children}

      <aside className="">
        <div className="bg-content-bg shadow">toc</div>
      </aside>
    </div>
  )
}
