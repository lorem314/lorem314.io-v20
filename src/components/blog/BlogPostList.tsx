import type { BlogPost } from "contentlayer/generated"

import BlogPostItem from "./BlogPostItem"

export default function BlogPostList({ blogPosts }: { blogPosts: BlogPost[] }) {
  return (
    <ul className="flex flex-col gap-2.5 px-2.5">
      {blogPosts.map((blogPost) => {
        return (
          <li key={blogPost._id}>
            <BlogPostItem blogPost={blogPost} />
          </li>
        )
      })}
    </ul>
  )
}
