import { allBlogPosts } from "contentlayer/generated"

import Layout from "@/components/blog/Layout"
import { collectAllTags } from "@/lib/utils"

export default function Page() {
  const allTags = collectAllTags(allBlogPosts)

  return <Layout allBlogPosts={allBlogPosts} allTags={allTags} />
}
