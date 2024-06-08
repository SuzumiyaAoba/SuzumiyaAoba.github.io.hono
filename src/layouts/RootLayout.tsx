import { metadata } from "@metadata";

import { Style } from "hono/css";
import type { FC, PropsWithChildren } from "hono/jsx";

import { Footer } from "@components/footer";
import { Header } from "@components/header";
import GoogleAnalytics from "@libs/components/google-analytics";
import GoogleFonts from "@libs/components/google-fonts";
import Partytown from "@libs/components/partytown";

export const RootLayout: FC<
  PropsWithChildren<{
    title: string;
    description?: string;
    // @ts-ignore
    headChildren?: JSX.Element;
  }>
> = ({ title, description, headChildren, children }) => {
  return (
    <>
      <head>
        <title>{title}</title>
        {description ? (
          <meta name="description" content={description} />
        ) : (
          <></>
        )}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="generator" content="Hono" />

        {/* CSS */}
        <Style />
        <GoogleFonts fonts={metadata.googleFonts} />

        {/* JavaScript */}
        <Partytown />
        <GoogleAnalytics tagId={metadata.googleAnalytics.tagId} />

        {headChildren}
      </head>
      <body className="flex flex-col min-h-screen">
        <div class="px-4">
          <Header siteName={metadata.siteName} />
          {children}
          <Footer copyright={metadata.copyright} />
        </div>
      </body>
    </>
  );
};
