import type { FC } from "hono/jsx";

export const KatexCss: FC = () => {
  return (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
    />
  );
};
