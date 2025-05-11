"use client"

import { useCallback, useEffect, useState } from "react"
import type { ChangeEvent, MouseEvent } from "react"
import type { BlogPost } from "contentlayer/generated"

import Search from "./Search"
import Select from "./Select"
import AllTags from "./AllTags"
import Drawer from "../ui/Drawer"
import BlogPostList from "./BlogPostList"
import useGlobalContext from "@/hooks/useGlobalContext"
import useDebounce from "@/hooks/useDebounce"
import { twMerge } from "tailwind-merge"
import type { Tag } from "@/types"

export default function Layout({
  allBlogPosts,
  allTags,
}: {
  allBlogPosts: BlogPost[]
  allTags: Tag[]
}) {
  const [blogPosts, setBlogPosts] = useState(allBlogPosts)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [isOrMode, setIsOrMode] = useState(true)
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)
  const { showRightDrawerOpener, isRightDrawerOpen, rightDrawerHandler } =
    useGlobalContext()

  const handleSelectTag = useCallback(
    (tag: Tag) => (event: MouseEvent | KeyboardEvent) => {
      setSelectedTags((prevSelectedTags) => {
        const hasSelected = prevSelectedTags.includes(tag)
        if (hasSelected) {
          event.stopPropagation()
          return prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
        } else {
          if (event.shiftKey) return [...prevSelectedTags, tag]
          else return [tag]
        }
      })
    },
    [],
  )

  const clearSelectedTags = useCallback(() => setSelectedTags([]), [])

  const handleChangeQuery = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    [],
  )

  const toggleFilterMode = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    setIsOrMode((_) => !_)
  }, [])

  useEffect(() => {
    setBlogPosts(
      allBlogPosts
        .filter((blogPost) => {
          if (!debouncedQuery) return true
          const lowercasedQuery = debouncedQuery.toLowerCase()
          const lowercasedBlogPostTitle = blogPost.title.toLowerCase()
          return lowercasedBlogPostTitle.includes(lowercasedQuery)
        })
        .filter((blogPost) => {
          if (selectedTags.length === 0) return true
          return selectedTags
            .map((tag) => blogPost.tags.includes(tag.name))
            [isOrMode ? "some" : "every"]((b) => b)
        }),
    )
  }, [debouncedQuery, selectedTags, isOrMode])

  return (
    <div className="mx-auto my-8 grid max-w-6xl grid-cols-8 gap-2.5">
      <div className="page-content col-span-8 flex flex-col gap-2.5 md:grid md:grid-cols-2">
        <Search value={query} onChange={handleChangeQuery} />
        <Select
          options={allTags}
          selectedTags={selectedTags}
          onSelectTag={handleSelectTag}
          clearSelectedTags={clearSelectedTags}
          isOrMode={isOrMode}
          toggleFilterMode={toggleFilterMode}
        />
      </div>

      <section
        className={twMerge(
          "page-content",
          showRightDrawerOpener ? "col-span-full" : "col-span-5",
        )}
      >
        <h2 className="content-title">博客</h2>
        <BlogPostList blogPosts={blogPosts} />
      </section>

      {showRightDrawerOpener ? (
        <Drawer
          isOpen={isRightDrawerOpen}
          onClose={rightDrawerHandler.close}
          placement="right"
          size={360}
          title="所有标签"
        >
          {() => {
            return (
              <div className="p-2.5">
                <AllTags
                  allTags={allTags}
                  selectedTags={selectedTags}
                  handleSelectTag={handleSelectTag}
                />
              </div>
            )
          }}
        </Drawer>
      ) : (
        <section className="page-content col-span-3">
          <h2 className="content-title">所有标签</h2>
          <AllTags
            allTags={allTags}
            selectedTags={selectedTags}
            handleSelectTag={handleSelectTag}
          />
        </section>
      )}
    </div>
  )
}
