import Link from "@/components/elements/Link"
import Button from "@/components/ui/Button"

export default function PageHome() {
  return (
    <>
      <div className="page-content mx-auto my-8 max-w-prose">
        <h1>helo</h1>

        <div>
          <Button size={"small"}>按钮</Button>
        </div>
        <div>
          <Button size={"large"} variant="outline">
            按钮
          </Button>
        </div>

        <p>
          This links to the <Link href="/">Home</Link> page.
        </p>
        <p>
          This links to the{" "}
          <Link href="/" color="current">
            Home
          </Link>{" "}
          page.
        </p>
        <p>
          This links to <Link href="https://baidu.com">Bilibili</Link> page.
        </p>

        <p className="my-4 opacity-87">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
          eligendi consequuntur quasi maiores, ab optio, ipsum mollitia
          perferendis expedita numquam nulla nam eaque, iste voluptates
          excepturi natus cupiditate illo tenetur!
        </p>

        <p className="my-4 opacity-60">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam natus
          molestiae, doloremque optio harum repudiandae animi voluptatem
          quisquam!
        </p>

        <p className="my-4 opacity-38">
          Lorem ipsum dolor sit amet, consectetur adipisicing.
        </p>
      </div>
      <div className="bg-content-bg mx-auto my-8 max-w-prose rounded border-white/38 p-2.5 dark:border">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum qui eos
          hic eveniet! Cum nam culpa fugiat voluptatibus in officiis sed quas
          repellat esse sequi, laudantium neque eius explicabo optio corporis,
          omnis animi dolore odit. Eveniet vero voluptatibus quaerat voluptas?
        </p>
      </div>
    </>
  )
}
