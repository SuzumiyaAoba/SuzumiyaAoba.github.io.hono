import { raw } from "hono/html";
import type { FC } from "hono/jsx";

import { format } from "date-fns";

import { Giscus } from "@libs/components/Giscus";

import { Tag } from "@components/Tag";
import { CalendarDaysIcon } from "@components/icons";
import { metadata } from "@metadata";
import * as blog from "@repositories/blog";

export const BlogPostPage: FC<{ id: string }> = async ({ id }) => {
  const post = await blog.getPost("./content/blog", id);
  const content = await post.content();

  return (
    <main className="max-w-3xl w-full px-4 mx-auto mb-12">
      <article class="mb-16">
        <h1 class="flex py-0 my-1 justify-center">
          <a class="no-underline" href={post.slug}>
            {content.frontmatter.title}
          </a>
        </h1>
        <div class="flex justify-center items-center my-2">
          <CalendarDaysIcon />
          <p class="my-0 p-0 ml-1 indent-0">
            {format(content.frontmatter.created_at, "yyyy/MM/dd")}
          </p>
        </div>
        <ul class="flex flex-wrap list-none justify-center">
          {content.frontmatter.tags.map((tag) => (
            <li>
              <Tag name={tag} />
            </li>
          ))}
        </ul>
        <div>{raw(content.html)}</div>
      </article>
      <hr />
      <section class="mt-16">
        <Giscus {...metadata.giscus} />
      </section>
    </main>
  );
};
