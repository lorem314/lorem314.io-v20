"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"

import { IoMdArrowBack } from "react-icons/io"
import { BiSolidArrowToTop } from "react-icons/bi"
import { MdFullscreen, MdFullscreenExit } from "react-icons/md"

import Tooltip from "../ui/Tooltip"
import Button from "../ui/Button"

export default function Actions() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) setIsFullscreen(true)
      else setIsFullscreen(false)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const enterFullscreen = useCallback(() => {
    const nodeMainContent = document.getElementById("main")
    if (nodeMainContent && nodeMainContent.requestFullscreen) {
      nodeMainContent.requestFullscreen()
    } else {
      alert("浏览器不支持全屏")
    }
  }, [])

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  const toTop = useCallback(() => {
    document.getElementById("main")?.scrollTo(0, 0)
  }, [])

  const goBack = useCallback(() => {
    const splitted = pathname.split("/")
    const withoutLast = splitted.slice(0, splitted.length - 1)
    router.push(withoutLast.join("/"))
  }, [])

  const actions = [
    { tip: "后退", Icon: IoMdArrowBack, onClick: goBack },
    { tip: "回到顶部", Icon: BiSolidArrowToTop, onClick: toTop },
    isFullscreen
      ? { tip: "退出全屏", Icon: MdFullscreenExit, onClick: exitFullscreen }
      : { tip: "进入全屏", Icon: MdFullscreen, onClick: enterFullscreen },
  ]

  return (
    <aside className="">
      <ul className="sticky top-2.5 flex flex-col items-center gap-2.5">
        {actions.map((action: (typeof actions)[number]) => {
          const { tip, Icon, onClick } = action
          return (
            <li
              key={tip}
              className="bg-content-bg rounded shadow transition-colors"
            >
              <Tooltip placement="right" tip={tip}>
                <Button variant="icon" onClick={onClick}>
                  <Icon />
                </Button>
              </Tooltip>
            </li>
          )
        })}
      </ul>
      {/* <Tooltip tip="后退" placement="right">
        <Button variant="icon">
          <IoMdArrowBack className="" />
        </Button>
      </Tooltip>

      <Tooltip tip="后退" placement="right">
        <Button variant="icon">
          <BiSolidArrowToTop className="" />
        </Button>
      </Tooltip>

      {true ? (
        <Tooltip tip="后退" placement="right">
          <Button variant="icon">
            <MdFullscreenExit className="" />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip tip="后退" placement="right">
          <Button variant="icon">
            <MdFullscreen className="" />
          </Button>
        </Tooltip>
      )} */}
    </aside>
  )
}
