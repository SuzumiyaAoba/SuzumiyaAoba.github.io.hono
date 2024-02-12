import { css } from "@twind/core";
import type { FC } from "hono/jsx";
import { TagIcon } from "./icons";

export const Tag: FC<{
  name: string;
}> = ({ name }) => {
  const tagCss = css`
    @apply flex gap-1;
    @apply mx-1 my-1 px-2 py-1;
    @apply items-center;
    @apply text-sm font-bold;
    @apply border border-black rounded-full;
  `;

  return (
    <div class={tagCss}>
      <TagIcon className="w-5 h-5" />
      {name}
    </div>
  );
};
