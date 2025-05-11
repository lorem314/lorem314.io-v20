"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { AiOutlineTags } from "react-icons/ai"
import { VscListTree } from "react-icons/vsc"

import Header from "./Header"
import Sidebar from "./Sidebar"
import Drawer from "../ui/Drawer"
import useClient from "@/hooks/useClient"
import useDrawer from "@/hooks/useDrawer"
import useLocalStorage from "@/hooks/useLocalStorage"
import GlobalContext from "./GlobalContext"

import type { PreferredTheme } from "@/types"
import type { IconType } from "react-icons"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isClient = useClient()
  const pathname = usePathname()

  const [preferredTheme, setPreferredTheme] = useLocalStorage<PreferredTheme>(
    "preferred-theme",
    "system",
  )

  const isLeftDrawerAlwaysCollapsed = false
  const {
    isCollapsed: isLeftDrawerCollapsed,
    isOpen: isLeftDrawerOpen,
    handler: leftDrawerHandler,
  } = useDrawer({
    isAlwaysCollapsed: isLeftDrawerAlwaysCollapsed,
    mediaQuery: "(max-width: 84rem)",
  })
  const showLeftDrawerOpener =
    isLeftDrawerAlwaysCollapsed || isLeftDrawerCollapsed

  const isRightDrawerAlwaysCollapsed = false
  const rightDrawerProps = getRightDrawerProps(pathname)
  const {
    isCollapsed: isRightDrawerCollapsed,
    isOpen: isRightDrawerOpen,
    handler: rightDrawerHandler,
  } = useDrawer({
    isAlwaysCollapsed: isRightDrawerAlwaysCollapsed,
    mediaQuery: rightDrawerProps.mediaQuery,
  })
  const showRightDrawerOpener =
    isRightDrawerAlwaysCollapsed || isRightDrawerCollapsed

  // theme
  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleThemeChange = ({ matches }: { matches: boolean }) => {
      if (matches) {
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
      }
    }

    if (preferredTheme === "system") {
      darkQuery.addEventListener("change", handleThemeChange)
      const dataTheme = darkQuery.matches ? "dark" : "light"
      document.documentElement.setAttribute("data-theme", dataTheme)
    } else {
      document.documentElement.setAttribute("data-theme", preferredTheme)
    }

    return () => {
      darkQuery.removeEventListener("change", handleThemeChange)
    }
  }, [preferredTheme])

  return isClient ? (
    <GlobalContext.Provider
      value={{
        test: "OK",

        preferredTheme,
        setPreferredTheme,

        showRightDrawerOpener,
        isRightDrawerOpen,
        rightDrawerHandler,
      }}
    >
      <Header
        showLeftDrawerOpener={showLeftDrawerOpener}
        openLeftDrawer={leftDrawerHandler.open}
        showRightDrawerOpener={showRightDrawerOpener}
        openRightDrawer={rightDrawerHandler.open}
        RightDrawerIcon={rightDrawerProps.icon}
      />

      {showLeftDrawerOpener ? (
        <Drawer
          isOpen={isLeftDrawerOpen}
          placement="left"
          size={320}
          onClose={leftDrawerHandler.close}
        >
          <Sidebar />
        </Drawer>
      ) : (
        <aside className="absolute top-12.5 bottom-0 left-0 w-80 bg-amber-400">
          <Sidebar />
        </aside>
      )}

      <main
        id="main"
        className="bg-bg-0 absolute top-12.5 right-0 bottom-0 overflow-auto px-2.5 transition-colors"
        style={{ left: showLeftDrawerOpener ? "0" : `${320}px` }}
      >
        <div>{children}</div>
      </main>
    </GlobalContext.Provider>
  ) : (
    "not on client"
  )
}

const getRightDrawerProps = (
  pathname: string,
): { mediaQuery: string; icon: IconType | null } => {
  const splitted = pathname.split("/")
  const length = splitted.length

  if (splitted[1] === "blogs" && length === 2) {
    // /blogs
    return { mediaQuery: "(max-width: 1024px)", icon: AiOutlineTags }
  } else if (splitted[1] === "blogs" && length === 3) {
    // /blogs/[title]
    return { mediaQuery: "(max-width: 1024px)", icon: VscListTree }
  } else if (splitted[1] === "books" && length === 4) {
    // /books/[title]/[chapter]
    return { mediaQuery: "(max-width: 1024px)", icon: VscListTree }
  } else {
    return { mediaQuery: "(max-width: 0px)", icon: null }
  }
}
