"use client"

import { addToast } from "@/components/ui/Toaster"

export default function Page() {
  return (
    <div>
      <div>setting page</div>
      <button
        onClick={() => {
          addToast({ title: "title", body: "body" })
        }}
      >
        Add Toast
      </button>
    </div>
  )
}
