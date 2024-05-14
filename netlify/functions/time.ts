import type { Context } from "@netlify/functions"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async (req: Request, context: Context) => {
  await sleep(2000)

  return new Response(`${new Date()}`, {
    headers: {
      "content-type": "text/html"
    }
  })
}

export const config = {
  path: "/partial/time"
}