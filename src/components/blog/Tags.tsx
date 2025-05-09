const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <ul className="my-2 flex flex-wrap items-center gap-2.5">
      {tags.map((tag, index) => {
        return (
          <li
            key={index}
            className="rounded border-1 border-current/38 px-2.5 py-1.5"
          >
            {tag}
          </li>
        )
      })}
    </ul>
  )
}

export default Tags
