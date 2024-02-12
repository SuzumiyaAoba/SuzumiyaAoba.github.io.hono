import { raw } from "hono/html";
import type { FC } from "hono/jsx";

import * as blog from "@repositories/blog";

export const BlogPostPage: FC<{ id: string }> = async ({ id }) => {
  const post = await blog.getPost("./content/blog", id);
  const content = await post.content();

  return (
    <main className="max-w-3xl w-full px-4 mx-auto mb-12">
      {raw(content.html)}
    </main>
  );
};
