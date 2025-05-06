import { useState, useEffect, useCallback } from "react"

const useDrawer = ({
  isAlwaysCollapsed,
  mediaQuery,
}: {
  isAlwaysCollapsed: boolean
  mediaQuery: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const [isCollapsed, setIsCollapsed] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(mediaQuery).matches
      : true,
  )

  useEffect(() => {
    const isCollapsed =
      isAlwaysCollapsed || window.matchMedia(mediaQuery).matches
    setIsCollapsed(isCollapsed)
  }, [isAlwaysCollapsed, mediaQuery])

  useEffect(() => {
    const handleWindowResize = () => {
      setIsCollapsed((prevIsCollapsed) => {
        const nextIsCollapsed =
          isAlwaysCollapsed || window.matchMedia(mediaQuery).matches
        if (prevIsCollapsed && !nextIsCollapsed && !isAlwaysCollapsed) {
          setIsOpen(false)
        }
        return nextIsCollapsed
      })
    }

    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [isAlwaysCollapsed, mediaQuery])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return {
    isCollapsed,
    isOpen,
    handler: { open, close },
  }
}

export default useDrawer
