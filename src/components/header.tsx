import { css } from "@twind/core";
import type { FC } from "hono/jsx";

export const Header: FC<{
  siteName: string;
}> = (props) => {
  const titleCss = css`
    @apply font-display;
    @apply font-bold text-2xl;
    @apply no-underline hover:no-underline;
  `;

  return (
    <header className="flex max-w-3xl mx-auto my-2 w-full">
      <div class="mr-12">
        <a class={titleCss} href="/">
          {props.siteName}
        </a>
      </div>
      <nav className="hidden sm:block font-accent my-auto">
        <ul class="flex gap-x-8 list-none pl-0">
          <li>
            <a className="no-underline" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="no-underline" href="/notes/">
              Notes
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
