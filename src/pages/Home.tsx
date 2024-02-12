import type { FC } from "hono/jsx";

import { getPosts } from "@repositories/blog";
import { css } from "@twind/core";

import { PostListItem } from "@components/PostListItem";

export const Home: FC = async () => {
  const posts = await getPosts("./content/blog");

  const mainCss = css`
    @apply flex-grow;
    @apply w-full max-w-3xl;
    @apply mx-auto px-4 mb-12;
  `;

  const postsCss = css`
    @apply max-w-3xl;
    @apply px-2 mx-0;
  `;

  return (
    <main class={mainCss}>
      <h2>ブログ</h2>
      <div>
        <ul class={postsCss}>
          {posts.map((post) => <PostListItem post={post} />).toArray()}
        </ul>
      </div>
    </main>
  );
};
