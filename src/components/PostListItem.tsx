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
    <li className="flex mb-6 after:content-['']">
      <a className="w-full no-underline"
        href={`/blog/${format(createdAt, "yyyy/MM/dd")}/${slug}/`}>
        <div className="w-full px-4 py-2
                       border-l-2 border-black
                       border-y border-y-transparent
                       hover:border-x-4 hover:border-y hover:border-y-black">
          <div className="flex items-center text-sm">
            <CalendarDaysIcon />
            <div className="ml-1">{format(createdAt, "yyyy/MM/dd")}</div>
          </div>
          {title}
        </div>
      </a>
    </li>
  );
};
