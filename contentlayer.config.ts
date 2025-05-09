import { defineDocumentType, makeSource } from "contentlayer2/source-files"
import { remarkCodeHike } from "codehike/mdx"

const BlogPost = defineDocumentType(() => {
  return {
    name: "BlogPost",
    contentType: "mdx",
    filePathPattern: "blog-posts/**/index.mdx",
    fields: {
      title: { type: "string", required: true },
      tags: { type: "list", of: { type: "string" }, default: [] },
      date: { type: "date", required: true },
    },
    computedFields: {},
  }
})

export default makeSource({
  contentDirPath: "published",
  documentTypes: [BlogPost],
  mdx: {
    remarkPlugins: [
      // [
      //   remarkCodeHike,
      //   {
      //     components: {
      //       code: "CodeHikePre",
      //     },
      //   },
      // ],
    ],
  },
})
