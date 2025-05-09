"use client"

import Link from "next/link"
import { twMerge } from "tailwind-merge"

import { RiMenu2Line } from "react-icons/ri"
import type { IconType } from "react-icons"

import Search from "./Search"
import Social from "./Social"
import ThemeToggler from "./ThemeToggler"

type HeaderProps = {
  openLeftDrawer: () => void
  showLeftDrawerOpener: boolean
  showRightDrawerOpener: boolean
  openRightDrawer: () => void
  RightDrawerIcon: IconType | null
}

const Header = ({
  openLeftDrawer,
  showLeftDrawerOpener,
  showRightDrawerOpener,
  openRightDrawer,
  RightDrawerIcon,
}: HeaderProps) => {
  return (
    <header className="bg-primary-color flex h-12.5 items-center justify-between gap-2.5 px-2.5 text-white transition-colors">
      {showLeftDrawerOpener ? (
        <button
          className={twMerge(
            "rounded p-2 transition-colors",
            "bg-black/10 dark:bg-white/10",
            "hover:bg-black/20 dark:hover:bg-white/20",
            "active:bg-black/30 dark:active:bg-white/30",
          )}
          onClick={openLeftDrawer}
        >
          <RiMenu2Line />
        </button>
      ) : null}

      <h1 className="font-bold">
        <Link href="/">lorem314.io</Link>
      </h1>

      <Search />

      <Social />

      <ThemeToggler />

      {showRightDrawerOpener && RightDrawerIcon ? (
        <button
          className={twMerge(
            "rounded p-2 transition-colors",
            "bg-black/10 dark:bg-white/10",
            "hover:bg-black/20 dark:hover:bg-white/20",
            "active:bg-black/30 dark:active:bg-white/30",
          )}
          onClick={openRightDrawer}
        >
          <RiMenu2Line />
        </button>
      ) : null}
    </header>
  )
}

export default Header
