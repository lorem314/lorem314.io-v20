"use client"

import { useState, useEffect } from "react"

import Header from "./Header"
import Sidebar from "./Sidebar"
import Drawer from "../ui/Drawer"
import useClient from "@/hooks/useClient"
import useDrawer from "@/hooks/useDrawer"
import useLocalStorage from "@/hooks/useLocalStorage"
import GlobalContext from "./GlobalContext"

import { PreferredTheme } from "@/types"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isClient = useClient()

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

  // theme effect
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
      value={{ test: "OK", preferredTheme, setPreferredTheme }}
    >
      <Header
        showLeftDrawerOpener={showLeftDrawerOpener}
        openLeftDrawer={leftDrawerHandler.open}
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
        className="bg-bg-0 absolute top-12.5 right-0 bottom-0 overflow-auto transition-colors"
        style={{
          left: showLeftDrawerOpener ? "0" : `${320}px`,
        }}
      >
        {children}
      </main>
    </GlobalContext.Provider>
  ) : (
    "not on client"
  )
}
