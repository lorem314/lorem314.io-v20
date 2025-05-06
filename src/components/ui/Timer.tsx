"use client"

import { useState, useEffect, useMemo, memo } from "react"

import type { ReactNode } from "react"

type TimerProps = {
  duration?: number
  start?: number
  end?: number
  step?: number
  isTiming?: boolean
  onTimeout?: Function
  children?: null | ((arg0: number) => ReactNode)
}

const Timer = ({
  duration = 60000,
  start = 60,
  end = 0,
  step = -1,
  isTiming = true,
  onTimeout = () => {},
  children = null,
}: TimerProps) => {
  const [hasTimeout, setHasTimeout] = useState(false)
  const [count, setCount] = useState(start)
  const delay = useMemo(
    () => Math.abs((duration * step) / (start - end)),
    [duration, step, start, end],
  )

  useEffect(() => {
    let tid: ReturnType<typeof setInterval>
    if (isTiming) {
      tid = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 0) return prevCount + step
          setHasTimeout(true)
          clearInterval(tid)
          return prevCount
        })
      }, delay)
    }
  }, [delay, isTiming, hasTimeout, step])

  useEffect(() => {
    if (hasTimeout) onTimeout()
  }, [hasTimeout, onTimeout])

  return typeof children === "function" ? children(count) : count
}

export default memo(Timer)
