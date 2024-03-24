import { raw } from "hono/html";
import type { FC } from "hono/jsx";

import { format } from "date-fns";

import { Giscus } from "@libs/components/Giscus";

import { Tag } from "@components/Tag";
import { CalendarDaysIcon } from "@components/icons";
import { metadata } from "@metadata";
// import * as blog from "@repositories/blog";
import { org } from "@repositories/post/org";

export const BlogPostPage: FC<{ dir: string }> = async ({ dir }) => {
  const post = await org.getPost(dir);
  if (!post) {
    return <div>404 Not Found</div>;
  }
  const { year, month, date } = post.createdAt;
  const { slug } = post;

  return (
    <main className="max-w-3xl w-full px-4 mx-auto mb-12">
      <article class="mb-16">
        <h1 class="flex py-0 my-1 justify-center">
          <a
            class="no-underline"
            href={`/blog/${year}/${month}/${date}/${slug}/`}
          >
            {post.title}
          </a>
        </h1>
        <div class="flex justify-center items-center my-2">
          <CalendarDaysIcon />
          <p class="my-0 p-0 ml-1 indent-0">
            {format(new Date(year, month - 1, date), "yyyy/MM/dd")}
          </p>
        </div>
        <ul class="flex flex-wrap list-none justify-center">
          {post.tags.map((tag) => (
            <li>
              <Tag name={tag} />
            </li>
          ))}
        </ul>
        <div>{raw(post.html)}</div>
      </article>
      <hr />
      <section class="mt-16">
        <Giscus {...metadata.giscus} />
      </section>
    </main>
  );
};
