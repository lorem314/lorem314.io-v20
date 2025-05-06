"use client"

import { useEffect, useReducer, useState } from "react"
import type { ReactNode } from "react"
import { createPortal } from "react-dom"

import { VscChromeClose } from "react-icons/vsc"

import Timer from "./Timer"

type Action =
  | { type: "ADD"; payload: Omit<ToastProps, "id"> }
  | { type: "REMOVE"; payload: Pick<ToastProps, "id"> }
  | { type: "PAUSE"; payload: Pick<ToastProps, "id"> }
  | { type: "TIME"; payload: Pick<ToastProps, "id"> }

type ManagerCallback = (action: Action) => void

const manager = {
  callback(_action: Action) {},
  subscribe(callback: ManagerCallback) {
    this.callback = callback
  },
  add(payload: Omit<ToastProps, "id">) {
    this.callback({ type: "ADD", payload })
  },
  remove(payload: Pick<ToastProps, "id">) {
    this.callback({ type: "REMOVE", payload })
  },
  pause(payload: Pick<ToastProps, "id">) {
    this.callback({ type: "PAUSE", payload })
  },
  time(payload: Pick<ToastProps, "id">) {
    this.callback({ type: "TIME", payload })
  },
}

const reducer = (toasts: ToastProps[], action: Action) => {
  switch (action.type) {
    case "ADD":
      return [...toasts, { id: Date.now(), ...action.payload }]
    case "REMOVE":
      return toasts.filter((toast) => toast.id !== action.payload.id)
    case "PAUSE": {
      const idx = toasts.findIndex((toast) => toast.id === action.payload.id)
      if (idx !== -1) toasts[idx].isTiming = false
      return [...toasts]
    }
    case "TIME": {
      const idx = toasts.findIndex((toast) => toast.id === action.payload.id)
      if (idx !== -1) toasts[idx].isTiming = true
      return [...toasts]
    }
    default:
      return toasts
  }
}

const Toaster = () => {
  const [toasts, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const callback = (action: Action) => {
      dispatch(action)
    }

    manager.subscribe(callback)
  }, [])

  return toasts.length !== 0
    ? createPortal(<Toasts toastes={toasts} />, document.body)
    : null
}

export default Toaster

type ToastsProps = {
  toastes: ToastProps[]
}

const Toasts: React.FC<ToastsProps> = ({ toastes }) => {
  console.log("[Toaster.tsx] <Toasts /> toastes", toastes)
  return (
    <ul className="absolute top-0 right-0 flex h-full flex-col items-end gap-2.5 overflow-x-hidden overflow-y-auto p-2.5">
      {toastes.map((toast) => {
        return (
          <li key={toast.id}>
            <Toast toast={toast} />
          </li>
        )
      })}
    </ul>
  )
}

type ToastVariant = "INFO" | "WARNING" | "ERROR"

type ToastProps = {
  id: string | number
  variant: ToastVariant
  title: ReactNode
  body: ReactNode
  duration: number
  isTiming: boolean
}

const Toast = ({ toast }: { toast: ToastProps }) => {
  console.log("[Toaster.tsx] <Toast /> toast", toast)

  const [offsetX, setOffsetX] = useState(125)

  useEffect(() => setOffsetX(0), [])

  const handleRemove = () => {
    Promise.resolve()
      .then(() => {
        return new Promise<void>((resolve) => {
          setOffsetX(125)
          setTimeout(() => resolve(), 500)
        })
      })
      .then(() => {
        manager.remove({ id: toast.id })
      })
  }

  const handlePause = () => manager.pause({ id: toast.id })
  const handleTime = () => manager.time({ id: toast.id })

  return (
    <section
      className="bg-content-bg relative max-w-80 min-w-48 rounded shadow-xl transition-transform duration-150"
      style={{
        transform: `translateX(${offsetX}%)`,
      }}
    >
      <header className="flex items-center justify-between px-2.5 pt-2.5 pb-1.5">
        <div>{toast.title}</div>
        <button className="relative" onClick={handleRemove}>
          <VscChromeClose className="origin-center" />
          <Timer
            duration={toast.duration}
            start={100}
            end={0}
            isTiming={toast.isTiming}
            onTimeout={handleRemove}
          >
            {(time) => {
              const perimeter = Math.PI * (40 - 4)
              return (
                <svg
                  className="absolute -top-1 -left-1 size-6"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="fill-transparent stroke-blue-600"
                    cx="20"
                    cy="20"
                    r="18"
                    strokeWidth={4}
                    strokeDasharray={`${perimeter} ${perimeter}`}
                    strokeDashoffset={(time * perimeter) / 100}
                  />
                </svg>
              )
            }}
          </Timer>
        </button>
      </header>
      <p className="px-2.5 pt-1.5 pb-2.5">{toast.body}</p>
    </section>
  )
}

// export const addToast = (
//   title: ReactNode,
//   body: ReactNode,
//   variant = "INFO" as const,
//   duration = 5000,
//   isTiming = true,
// ) => {
//   manager.add({ title, body, variant, duration, isTiming })
// }
// addToast("", "")

export const addToast = ({
  title,
  body,
  variant = "INFO",
  duration = 10000,
  isTiming = true,
}: {
  title: ReactNode
  body: ReactNode
  variant?: ToastVariant
  duration?: number
  isTiming?: boolean
}) => {
  console.log("[Toaster.tsx] addToast")
  manager.add({ title, body, variant, duration, isTiming })
}
// addToast({ title: "", body: "" })
