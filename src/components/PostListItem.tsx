import { format } from "date-fns";
import type { FC } from "hono/jsx";

import { CalendarDaysIcon } from "@components/icons";
import type { Post } from "@repositories/post/post";
import { NoImageIcon } from "./icons/NoImage";

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
          className="flex flex-col w-full ml-0.5 h-full
                     border-2 border-black rounded"
        >
          <div className="flex justify-center w-full border-b-2 border-black p-2 py-4">
            <NoImageIcon width="96px" height="96px" />
          </div>
          <div className="m-2">
            <div className="flex items-center">
              <CalendarDaysIcon />
              <div className="ml-1 no-underline">
                {format(createdAt, "yyyy/MM/dd")}
              </div>
            </div>
            <div className="group-hover:underline decoration-dotted font-bold">
              {title}
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};
