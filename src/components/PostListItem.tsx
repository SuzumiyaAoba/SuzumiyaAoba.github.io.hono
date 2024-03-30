import { format } from "date-fns";
import type { FC } from "hono/jsx";

import { CalendarDaysIcon } from "@components/icons";
import type { Post } from "@repositories/post/post";

export const PostListItem: FC<{
  post: Post;
}> = ({ post }) => {
  const { slug, title } = post;
  const { year, month, date } = post.createdAt;
  const createdAt = new Date(year, month - 1, date);

  return (
    <li className="flex mb-8 after:content-['']">
      <div>
        <div className="flex items-center text-sm">
          <CalendarDaysIcon />
          <div className="ml-1">{format(createdAt, "yyyy/MM/dd")}</div>
        </div>
        <a href={`/blog/${format(createdAt, "yyyy/MM/dd")}/${slug}/`}>
          {title}
        </a>
      </div>
    </li>
  );
};
