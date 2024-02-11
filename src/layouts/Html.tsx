import { html } from "hono/html";
import type { FC, PropsWithChildren } from "hono/jsx";

export const Html: FC<
  PropsWithChildren<{
    globalCss: Promise<string>;
  }>
> = ({ globalCss, children }) => {
  return html`<!DOCTYPE html>${(
    <html lang="ja" class={globalCss}>
      {children}
    </html>
  )}`;
};
