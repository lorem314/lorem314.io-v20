import { createContext } from "react"

import { PreferredTheme } from "@/types"

interface GlobalContextProps {
  test: "OK"

  preferredTheme: PreferredTheme
  setPreferredTheme: (arg0: PreferredTheme) => void

  showRightDrawerOpener: boolean
  isRightDrawerOpen: boolean
  rightDrawerHandler: { open: () => void; close: () => void }
}

const GlobalContext = createContext<GlobalContextProps | null>(null)

export default GlobalContext
