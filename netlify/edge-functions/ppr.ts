import type { Config, Context } from "https://edge.netlify.com";
import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

type Partial = {
    id: number;
    resp: Promise<Response>;
}

export default async (request: Request, context: Context) => {
    let id = 0;
    const partials : Partial[] = [];

    const response = await context.next();
    return new HTMLRewriter()
    .on("*", {
        async element(element) {
          const src = element.getAttribute("data-ppr");
          if (src) {
            const url = src.match(/^https?:/) ? src : new URL(src, request.url);
            partials.push({
                id: ++id,
                resp: fetch(url.toString())
            })
            element.removeAttribute("data-ppr");
            element.setAttribute("id", `ppr-id-${id}`);
          }
        },
      })
      .on('body', {
        element(element) {
            element.onEndTag(async (tag) => {
                for (const partial of partials) {
                    const resp = await partial.resp;
                    const text = await resp.text();
                    tag.after(`<script>document.getElementById('ppr-id-${partial.id}').innerHTML = \`${text}\`;</script>`, {html: true});
                }
            })
        }
      }).transform(response);
}

export const config: Config = {
  path: "/"
}