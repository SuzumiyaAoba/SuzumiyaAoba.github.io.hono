import type { FC } from "hono/jsx";

import { org } from "@repositories/post/org";
import { css } from "@twind/core";

import { PostListItem } from "@components/PostListItem";

export const HomePage: FC = async () => {
  const posts = (await org.getPosts()).sort((a, b) => (a.id < b.id ? 1 : -1));

  const mainCss = css`
    @apply flex-grow;
    @apply w-full max-w-3xl;
    @apply mx-auto mt-8 mb-12;
  `;

  const titleCss = css`
    font-family: "Pacifico", system-ui;
    @apply text-2xl text-center;
    @apply bg-transparent border-l-0;
    @apply mb-12 p-0;
  `;

  const postsCss = css`
    @apply max-w-3xl;
    @apply px-0 mx-0;
    @apply grid grid-cols-1 md:grid-cols-2 gap-8;
  `;

  return (
    <main class={mainCss}>
      <h2 class={titleCss}>Posts</h2>
      <ul class={postsCss}>
        {posts.map((post) => (
          <PostListItem post={post} />
        ))}
      </ul>
    </main>
  );
};
