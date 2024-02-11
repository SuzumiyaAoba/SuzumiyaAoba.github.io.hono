import type { FC } from "hono/jsx";

type Props = {
  siteName: string;
};

export const Header: FC<Props> = (props) => {
  return (
    <header className="max-w-3xl mx-auto my-2 px-4 w-full">
      <div className="text-2xl">
        <a href="/">{props.siteName}</a>
      </div>
    </header>
  );
};
