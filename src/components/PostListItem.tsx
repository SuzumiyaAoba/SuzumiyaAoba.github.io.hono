import { format } from "date-fns";
import type { FC } from "hono/jsx";

import { CalendarDaysIcon } from "@components/icons";
import type { Post } from "@repositories/post/post";
import { IconFromText } from "./icons/IconFromText";
import { NoImageIcon } from "./icons/NoImage";
import { CalendarDate } from "./CalendarDate";

const postIcon = (categories: string[]) => {
  const width = "64px";
  const height = "64px";
  const noImageIcon = <NoImageIcon width={width} height={height} />;

  for (const category of categories) {
    return (
      <IconFromText text={category} width="64px" height="64px">
        {noImageIcon}
      </IconFromText>
    );
  }

  return noImageIcon;
};

export const PostListItem: FC<{
  post: Post;
}> = ({ post }) => {
  const { slug, title, categories } = post;
  const { year, month, date } = post.createdAt;
  const createdAt = new Date(year, month - 1, date);

  return (
    <li className="group flex after:content-[''] hover:bg-slate-100 rounded-xl p-4">
      <a
        className="w-full no-underline"
        href={`/blog/${format(createdAt, "yyyy/MM/dd")}/${slug}/`}
      >
        <div className="flex w-full h-full">
          <div className="flex-none px-2">
            <div className="group-hover:scale-110">{postIcon(categories)}</div>
          </div>
          <div className="flex-1 m-2">
            <CalendarDate date={createdAt} />
            <div className="group-hover:underline decoration-dotted font-bold">
              {title}
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};
