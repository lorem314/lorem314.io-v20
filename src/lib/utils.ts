import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type { BlogPost } from "contentlayer/generated"
import type { Tag } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const collectAllTags = (blogs: BlogPost[]) => {
  const tags: Tag[] = []
  blogs.forEach((blog) => {
    blog.tags.forEach((tagName) => {
      const targetTag = tags.find((tag) => tag.name === tagName)
      if (!targetTag) tags.push({ name: tagName, count: 1 })
      else targetTag.count++
    })
  })
  return tags
}

export const getDate = (date: string) => {
  const d = new Date(date)
  const yy = d.getFullYear()
  const mm = d.getMonth() + 1
  const dd = d.getDate()
  return `${yy} 年 ${mm} 月 ${dd} 日`
}

const timeUnits = [
  { divisor: 1000, unit: "秒" },
  { divisor: 60, unit: "分种" },
  { divisor: 60, unit: "小时" },
  { divisor: 24, unit: "天" },
  { divisor: 30, unit: "个月" },
  { divisor: 12, unit: "年" },
  { divisor: Number.POSITIVE_INFINITY },
]

export const getTimesAgo = (date: string) => {
  const elapse = Date.now() - new Date(date).getTime()
  let result = elapse
  for (let i = 0; i < timeUnits.length - 1; i++) {
    const timeUnit = timeUnits[i]
    if (!timeUnit) return ""
    const { divisor, unit } = timeUnit
    result = result / divisor
    const nextTimeUnit = timeUnits[i + 1]
    if (nextTimeUnit && result > nextTimeUnit.divisor) {
      continue
    } else {
      return `${Math.floor(result)} ${unit}`
    }
  }
}
