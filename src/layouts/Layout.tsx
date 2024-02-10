import { globalCss } from "@styles/global";
import type { FC, PropsWithChildren } from "hono/jsx";

export const Layout: FC = (props: PropsWithChildren) => {
  return (
    <>
      <html lang="ja" class={globalCss}>
        {props.children}
      </html>
    </>
  );
};
