# Partial Prerendering Without a Framework

This is a tiny demo of Partial Prerendering with plain HTML, Netlify Functions and Edge Functions without any framework.

This in implemented by a small edge function [ppr.ts](netlify/edge-functions/ppr.ts) that uses the HTMLRewriter library to first let Netlify serve the normal HTML page, while triggering requests for dynamic content during the response stream and appending them at the end of the response with script tags that will insert them at the right location in the document.

You can use the technique by adding tags with a `data-ppr` attribute:

```html
The time is: <span data-ppr="/partial/time">Loading...<span>
```

The content of the `data-ppr` span will get replaced with the response from `/partial/time`.

## Installing

To test locally, clone this repository and run:

```bash
npm i
npm install -g netlify-cli
netlify dev
```
