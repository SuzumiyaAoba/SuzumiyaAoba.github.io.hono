import { metadata } from "@metadata";

import { Style } from "hono/css";
import type { FC, PropsWithChildren } from "hono/jsx";

import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { GoogleAnalytics } from "@libs/components/GoogleAnalytics";
import { GoogleFonts } from "@libs/components/GoogleFonts";
import { Partytown } from "@libs/components/Partytown";

export const RootLayout: FC<
  PropsWithChildren<{
    title: string;
    // biome-ignore lint/correctness/noUndeclaredVariables:
    head?: JSX.Element;
  }>
> = ({ title, head, children }) => {
  return (
    <>
      <head>
        <title>{title}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="generator" content="Hono" />

        {/* CSS */}
        <Style />
        <GoogleFonts fonts={metadata.googleFonts} />

        {/* JavaScript */}
        <Partytown />
        <GoogleAnalytics tagId={metadata.googleAnalytics.tagId} />

        {head}
      </head>
      <body className="flex flex-col min-h-screen">
        <Header siteName={metadata.siteName} />
        {children}
        <Footer copyright={metadata.copyright} />
      </body>
    </>
  );
};
