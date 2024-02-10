import type { FC, PropsWithChildren } from "hono/jsx";
import { globalCss } from "./styles/global";

export const Layout: FC = (props: PropsWithChildren) => {
  return (
    <>
      <html lang="ja" class={globalCss}>
        {props.children}
      </html>
    </>
  );
};
