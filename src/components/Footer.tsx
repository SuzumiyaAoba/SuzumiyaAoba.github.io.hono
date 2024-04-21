import type { FC } from "hono/jsx";

export const Footer: FC<{
  copyright: string;
}> = ({ copyright }) => {
  const date = new Date();

  return (
    <footer className="w-auto mx-auto my-8 text-center">
      <div>
        &copy; {date.getFullYear()} {copyright}
      </div>
      <div>
        Powered by <a href="https://hono.dev/">Hono</a>
      </div>
    </footer>
  );
};
