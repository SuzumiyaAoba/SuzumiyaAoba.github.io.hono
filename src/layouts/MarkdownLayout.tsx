import type { FC, PropsWithChildren } from "hono/jsx";

import { KatexCss } from "@libs/components/KatexCss";
import { LiteYoutube } from "@libs/components/LiteYoutube";
import { StarryNightCss } from "@libs/components/StarryNightCss";

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
    </>
  );
  return (
    <RootLayout title={title} headChildren={headChildren}>
      {children}
    </RootLayout>
  );
};
