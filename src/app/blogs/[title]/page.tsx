import { allBlogPosts } from "contentlayer/generated"

import Layout from "@/components/article/Layout"

import Header from "@/components/blog/Header"
import Body from "@/components/article/Body"
import Footer from "@/components/blog/Footer"

export default async function Page({
  params,
}: {
  params: Promise<{ title: string }>
}) {
  const awaitedParams = await params
  const decodedTitle = decodeURIComponent(awaitedParams.title)

  const blogPost = allBlogPosts.find(
    (blogPost) => blogPost.title === decodedTitle,
  )

  if (!blogPost) {
    return <div>not found</div>
  }

  return (
    <Layout>
      <article>
        <Header />

        <Body bodyCode={blogPost.body.code} />

        <Footer />
      </article>
    </Layout>
  )
}
