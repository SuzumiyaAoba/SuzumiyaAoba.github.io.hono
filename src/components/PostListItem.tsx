import { format } from "date-fns";
import type { FC } from "hono/jsx";

import { CalendarDaysIcon } from "@components/icons";
import type { Post } from "@repositories/blog";

export const PostListItem: FC<{
  post: Post;
}> = async ({ post }) => {
  const content = post.content;
  const { year, month, date, slug } = post.id;

  return (
    <li className="flex mb-8 after:content-['']">
      <div>
        <div className="flex items-center text-sm">
          <CalendarDaysIcon />
          <div className="ml-1">
            {format(content.frontmatter.created_at, "yyyy/MM/dd")}
          </div>
        </div>
        <a href={`/blog/${year}/${month}/${date}/${slug}/`}>
          {content.frontmatter.title}
        </a>
      </div>
    </li>
  );
};
