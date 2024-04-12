import type { FC } from "hono/jsx";

import { org } from "@repositories/post/org";
import { css } from "@twind/core";

import { PostListItem } from "@components/PostListItem";

export const HomePage: FC = async () => {
  const posts = (await org.getPosts()).sort((a, b) => (a.id < b.id ? 1 : -1));

  const mainCss = css`
    @apply flex-grow;
    @apply w-full max-w-3xl;
    @apply mx-auto px-4 mb-12;
  `;

  const titleCss = css`
    font-family: 'Noto Sans JP', sans-serif;
    @apply text-xl font-bold;
    @apply bg-transparent border-l-0;
    @apply mt-0 p-0;
  `;

  const postsCss = css`
    @apply max-w-3xl;
    @apply px-0 mx-0;
    @apply grid grid-cols-2 auto-rows-auto gap-y-6 gap-x-12;
  `;

  return (
    <main class={mainCss}>
      <h2 class={titleCss}>ブログ</h2>
      <ul class={postsCss}>
        {posts.map((post) => (
          <PostListItem post={post} />
        ))}
      </ul>
    </main>
  );
};
