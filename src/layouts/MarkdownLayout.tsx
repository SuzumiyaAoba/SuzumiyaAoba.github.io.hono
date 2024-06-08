import type { FC, PropsWithChildren } from "hono/jsx";

import KatexCss from "@libs/components/katex-css";
import LiteYoutube from "@libs/components/lite-youtube";
import StarryNightCss from "@libs/components/starry-night-css";

import { RootLayout } from "./RootLayout";

export const MarkdownLayout: FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ title, children }) => {
  const headChildren = (
    <>
      <KatexCss />
      <StarryNightCss />
      <LiteYoutube />
      <link
        rel="stylesheet"
        href="https://esm.sh/@wooorm/starry-night@3/style/both"
      />
    </>
  );
  return (
    <RootLayout title={title} headChildren={headChildren}>
      {children}
    </RootLayout>
  );
};
