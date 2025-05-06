import { memo } from "react"
import { twMerge } from "tailwind-merge"

import { FaCodepen } from "react-icons/fa"
import { SiCodesandbox } from "react-icons/si"
import { FaGithub } from "react-icons/fa"
import { FaBilibili } from "react-icons/fa6"

import Tooltip from "../ui/Tooltip"

const refs = {
  codepen: "https://codepen.io/Number_DDD",
  codesandbox: "https://codesandbox.io/u/lorem314",
  github: "https://github.com/lorem314",
  bilibili: "https://space.bilibili.com/7909744/",
}

const links = [
  { Icon: FaCodepen, title: "Codepen", href: refs.codepen },
  { Icon: SiCodesandbox, title: "CodeSandbox", href: refs.codesandbox },
  { Icon: FaGithub, title: "Github", href: refs.github },
  { Icon: FaBilibili, title: "Bilibili", href: refs.bilibili },
]

const Social = () => {
  return (
    <ul className="flex items-center gap-2.5">
      {links.map((link, index) => {
        const { Icon, title, href } = link
        return (
          <li key={index}>
            <Tooltip tip={title} placement="bottom">
              <a
                className={twMerge(
                  "flex items-center gap-1.5 rounded bg-black/10 p-2",
                  "hover:bg-black/20",
                  "active:bg-black/30",
                  "lg:bg-transparent lg:p-0",
                  "lg:hover:bg-transparent",
                )}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
                <span className="hidden lg:inline">{title}</span>
              </a>
            </Tooltip>
          </li>
        )
      })}
    </ul>
  )
}

export default memo(Social)
