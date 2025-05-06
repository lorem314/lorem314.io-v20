import { useContext } from "react"

import GlobalContext from "@/components/layouts/GlobalContext"

const useGlobalContext = () => {
  const globalContext = useContext(GlobalContext)

  if (!globalContext) {
    throw new Error(
      "globalContext has to be used within <GlobalContext.Provider>",
    )
  }

  return globalContext
}

export default useGlobalContext
