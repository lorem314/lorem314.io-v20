import { twMerge } from "tailwind-merge"

import { IoMdSearch } from "react-icons/io"

const Search = () => {
  return (
    <div
      className={twMerge(
        "flex grow-1 items-center justify-end",
        "sm:justify-center",
      )}
    >
      <button
        className={twMerge(
          "flex cursor-pointer items-center gap-1.5 rounded p-2 transition-colors",
          "bg-black/10 dark:bg-white/10",
          "hover:bg-black/20 dark:hover:bg-white/20",
          "active:bg-black/30 dark:active:bg-white/30",
          "sm:basis-md sm:rounded-full sm:px-2.5 sm:py-1.5 sm:text-sm",
        )}
      >
        <IoMdSearch />
        <div
          className={twMerge(
            "hidden",
            "sm:flex sm:grow-1 sm:justify-between sm:gap-1",
          )}
        >
          <div className="">搜索</div>
          <div className="">
            <kbd>Ctrl</kbd>
            <kbd>K</kbd>
          </div>
        </div>
      </button>
    </div>
  )
}

export default Search
