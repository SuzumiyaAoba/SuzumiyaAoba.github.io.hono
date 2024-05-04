import { css } from "@twind/core";
import type { FC } from "hono/jsx";

const style = css`
  @apply w-auto my-8;
  @apply text-center;
  @apply font-light text-sm;
`;

export const Footer: FC<{
  copyright: string;
}> = ({ copyright }) => {
  const date = new Date();

  return (
    <footer class={style}>
      <div>
        &copy; {date.getFullYear()} {copyright}
      </div>
      <div>
        Powered by <a href="https://hono.dev/">Hono</a>
      </div>
    </footer>
  );
};
