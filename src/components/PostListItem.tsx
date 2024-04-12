import { format } from "date-fns";
import type { FC } from "hono/jsx";

import { CalendarDaysIcon } from "@components/icons";
import type { Post } from "@repositories/post/post";
import { Daily } from "./icons/Daily";
import { Emacs } from "./icons/Emacs";
import { Keyboard } from "./icons/Keyboard";
import { Mathematics } from "./icons/Matematics";
import { Nix } from "./icons/Nix";
import { NoImageIcon } from "./icons/NoImage";
import { Programming } from "./icons/Programming";
import { Stock } from "./icons/Stock";

const postIcon = (categories: string[]) => {
  const width = "128px";
  const height = "128px";

  for (const category of categories) {
    switch (category) {
      case "キーボード":
        return <Keyboard width={width} height={height} />;
      case "株":
        return <Stock width={width} height={height} />;
      case "週報":
        return <Daily width={width} height={height} />;
      case "Emacs":
        return <Emacs width={width} height={height} />;
      case "Nix":
        return <Nix width={width} height={height} />;
      case "数学":
        return <Mathematics width={width} height={height} />;
      case "プログラミング":
        return <Programming width={width} height={height} />;
    }
  }

  return <NoImageIcon width="96px" height="96px" />;
};

export const PostListItem: FC<{
  post: Post;
}> = ({ post }) => {
  const { slug, title, categories } = post;
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
            <div className="group-hover:scale-125">{postIcon(categories)}</div>
          </div>
          <div className="m-4">
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
