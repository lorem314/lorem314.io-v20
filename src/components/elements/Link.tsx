import NextLink from "next/link"
import type { LinkProps } from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import type { FC, HTMLProps } from "react"

import { FaExternalLinkAlt } from "react-icons/fa"

const link = cva("inline-flex items-center gap-1.5 transition-colors", {
  variants: {
    color: {
      link: "text-link-color",
      current: "text-current",
    },
  },
  defaultVariants: {
    color: "link",
  },
})

const Link: FC<
  LinkProps & HTMLProps<HTMLAnchorElement> & VariantProps<typeof link>
> = ({ color, className, href, children, ...props }) => {
  const isExternal = href.startsWith("https")

  return (
    <NextLink href={href} className={link({ color, className })} {...props}>
      {children}
      {isExternal ? <FaExternalLinkAlt className="text-sm" /> : null}
    </NextLink>
  )
}

export default Link
