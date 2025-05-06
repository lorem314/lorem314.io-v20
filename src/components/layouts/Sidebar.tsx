import { memo } from "react"
import Link from "next/link"

import { FaHome } from "react-icons/fa"
import { RiArticleFill } from "react-icons/ri"
import { FaBook } from "react-icons/fa"
import { RiSettings3Fill } from "react-icons/ri"

import Tooltip from "../ui/Tooltip"

const routes = [
  { Icon: FaHome, title: "主页", href: "/" },
  { Icon: RiArticleFill, title: "博客", href: "/blogs" },
  { Icon: FaBook, title: "书籍", href: "/books" },
  { Icon: RiSettings3Fill, title: "设置", href: "/setting" },
]

const Sidebar = () => {
  return (
    <nav className="bg-bg-1 flex h-full transition-colors">
      <ul className="bg-bg-0 flex shrink-0 basis-12.5 flex-col items-center gap-2.5 pt-2.5 transition-colors">
        {routes.map((route, index) => {
          const { Icon, title, href } = route
          return (
            <li key={index} className="flex">
              <Tooltip tip={title} placement="right">
                <Link className="misc-button" href={href}>
                  <Icon />
                </Link>
              </Tooltip>
            </li>
          )
        })}
      </ul>

      <section className="page-content mx-2.5 mt-2.5 grow-0 overflow-y-auto">
        {Array(30)
          .fill(null)
          .map((item, index) => {
            return (
              <div key={index}>
                <p className="">
                  {index} Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Facilis, sed.
                </p>
              </div>
            )
          })}
      </section>
    </nav>
  )
}

export default memo(Sidebar)
