import type { Context } from "@netlify/functions"

export default async (req: Request, context: Context) => {
  return new Response(`${new Date()}`, {
    headers: {
      "content-type": "text/html"
    }
  })
}

export const config = {
  path: "/partial/time"
}