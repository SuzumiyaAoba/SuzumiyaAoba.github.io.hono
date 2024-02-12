import { metadata } from "@metadata";

import { Style } from "hono/css";
import type { FC, PropsWithChildren } from "hono/jsx";

import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { GoogleAnalytics } from "@libs/components/GoogleAnalytics";
import { GoogleFonts } from "@libs/components/GoogleFonts";
import { Partytown } from "@libs/components/Partytown";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta name="generator" content="Hono" />
        <Style />
        <GoogleFonts fonts={metadata.googleFonts} />
        <Partytown />
        <GoogleAnalytics tagId={metadata.googleAnalytics.tagId} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
        <link rel="stylesheet" href="/assets/css/starry-night/index.css" />
        <link rel="stylesheet" href="/assets/css/starry-night/light.css" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header siteName={metadata.siteName} />
        {children}
        <Footer copyright={metadata.copyright} />
      </body>
    </>
  );
};
