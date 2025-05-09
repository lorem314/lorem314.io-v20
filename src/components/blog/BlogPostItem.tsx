import { memo } from "react"
import Link from "next/link"
import type { BlogPost } from "contentlayer/generated"

import Tags from "./Tags"
import { getDate } from "@/lib/utils"

const BlogPostItem = ({ blogPost }: { blogPost: BlogPost }) => {
  return (
    <article>
      <header>
        <h3 className="font-bold">
          <Link className="text-link-color" href="/">
            {blogPost.title}
          </Link>
        </h3>
      </header>
      <div className="text-sm">
        <Tags tags={blogPost.tags} />
      </div>
      <footer>
        <p className="text-current/60">发布于 {getDate(blogPost.date)}</p>
      </footer>
    </article>
  )
}

export default memo(BlogPostItem)
