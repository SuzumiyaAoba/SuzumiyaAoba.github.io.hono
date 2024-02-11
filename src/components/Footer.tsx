import type { FC } from "hono/jsx";

type Props = {
  copyright: string;
};

export const Footer: FC<Props> = ({ copyright }) => {
  return (
    <footer class="w-auto mx-auto my-8 text-center">
      &copy; 2023 {copyright}
      Powered by <a href="https://hono.dev/">Hono</a>
    </footer>
  );
};
