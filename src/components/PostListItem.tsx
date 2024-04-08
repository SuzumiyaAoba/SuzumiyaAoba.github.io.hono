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
    <li className="group flex mb-4 after:content-['']">
      <a
        className="w-full no-underline"
        href={`/blog/${format(createdAt, "yyyy/MM/dd")}/${slug}/`}
      >
        <div
          className="w-full p-4 ml-0.5
                        border-1 border-l-4 border-black rounded"
        >
          <div className="flex items-center text-sm">
            <CalendarDaysIcon />
            <div className="ml-1 no-underline">
              {format(createdAt, "yyyy/MM/dd")}
            </div>
          </div>
          <div className="group-hover:underline decoration-dotted">{title}</div>
        </div>
      </a>
    </li>
  );
};
