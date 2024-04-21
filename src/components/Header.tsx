import { css } from "@twind/core";
import type { FC } from "hono/jsx";

export const Header: FC<{
  siteName: string;
}> = (props) => {
  const titleCss = css`
    @apply font-display;
    @apply font-bold text-2xl;
    @apply no-underline;
  `;

  return (
    <header className="max-w-3xl mx-auto my-2 w-full">
      <div>
        <a class={titleCss} href="/">
          {props.siteName}
        </a>
      </div>
    </header>
  );
};
