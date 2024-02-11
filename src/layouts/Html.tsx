import { html } from "hono/html";
import type { FC, PropsWithChildren } from "hono/jsx";

export type Props = {
  globalCss: Promise<string>;
};

export const Html: FC<PropsWithChildren<Props>> = ({ globalCss, children }) => {
  return html`<!DOCTYPE html>${
    <html lang="ja" class={globalCss}>
      {children}
    </html>
  }`;
};
