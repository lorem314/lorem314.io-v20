export default function Body({ bodyCode }: { bodyCode: string }) {
  return (
    <div className="bg-content-bg my-2.5 rounded shadow">
      {Array(100)
        .fill(null)
        .map((_, index) => {
          return (
            <p key={index} className="my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              ratione fugiat nobis ullam.
            </p>
          )
        })}
    </div>
  )
}
