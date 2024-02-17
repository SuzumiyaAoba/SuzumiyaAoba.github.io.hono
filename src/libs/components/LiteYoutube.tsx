import type { FC } from "hono/jsx";

export const LiteYoutube: FC = () => {
  return (
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1.5.0/lite-youtube.js"
    />
  );
};
