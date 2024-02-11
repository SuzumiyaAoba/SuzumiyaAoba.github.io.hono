import type { FC } from "hono/jsx";

export const Footer: FC<{
  copyright: string;
}> = ({ copyright }) => {
  return (
    <footer className="w-auto mx-auto my-8 text-center">
      <div>&copy; 2023 {copyright}</div>
      <div>
        Powered by <a href="https://hono.dev/">Hono</a>
      </div>
    </footer>
  );
};
