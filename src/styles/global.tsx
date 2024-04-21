import { css } from "@twind/core";

export const globalCss = css`
  body {
    font-family: "Shippori Mincho", serif;
    @apply leading-loose;
  }

  h1 {
    @apply font-black;
    @apply text-2xl leading-10;
  }

  h2, h3, h4, h5, h6 {
    @apply font-black;
    @apply mt-8 mb-4;
  }

  h2 {
    @apply py-2 pl-2;
    @apply text-lg;
    @apply border-l-4 border-black;
    @apply bg-gray-300;
  }

  h3 {
    @apply font-black text-lg;
    @apply border-b-2 border-black;
  }

  h4 {
    @apply pl-2;
    @apply font-black text-lg;
    @apply border-l-4 border-black;
  }

  p {
    @apply indent-3;
    @apply my-2;
  }

  a {
    @apply underline underline-offset-4;
    @apply decoration-dotted hover:decoration-solid;
  }

  img {
    @apply mx-auto;
    @apply object-cover max-w-2xl w-full h-full;
    @apply my-8 p-4;
    @apply border border-black;
  }

  ul, ol {
    @apply pl-12;
  }

  ul {
    @apply list-disc;
  }

  ol {
    @apply list-decimal;
  }

  table {
    @apply table-auto;
    @apply mx-auto my-6;
  }

  thead {
    @apply bg-neutral-200;
  }

  tr {
    @apply border-y border-black;
  }

  th, td {
    @apply px-6 py-1;
  }

  :not(pre) > code {
    @apply font-mono;
    @apply mx-1;
  }

  pre code {
    @apply text-sm;
  }

  blockquote {
    @apply my-6 ml-4 pl-2 py-0.5;
    @apply text-sm;
    @apply text-neutral-600;
    @apply border-l-2 border-neutral-500;
  }

  /* rehype-starry-night */

  .highlight {
    @apply my-2;
  }

  .highlight-caption {
    @apply font-sans;
  }

  pre {
    @apply whitespace-pre;
  }

  pre code {
    @apply overflow-x-auto;
  }

  :root {
    /* light theme variables specific to rehype-starry-night plugin */
    --highlight-background-color: hsl(0, 0%, 100%);
    --highlight-border-color: hsl(208, 21%, 86%);
    --highlight-code-highlight: hsl(208, 19%, 82%);
  }

  /* YouTube */
  .video {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 56.25%;
  }

  .video iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
