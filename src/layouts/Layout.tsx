import { metadata } from "@metadata";

import { Style } from "hono/css";
import type { FC, PropsWithChildren } from "hono/jsx";

import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { GoogleFonts } from "@libs/components/GoogleFonts";
import { Partytown } from "@libs/components/Partytown";
import { GoogleAnalytics } from "@libs/components/GoogleAnalytics";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta name="generator" content="Hono" />
        <Style />
        <GoogleFonts fonts={metadata.googleFonts} />
        <Partytown />
        <GoogleAnalytics tagId="" />
      </head>
      <body class="flex flex-col min-h-screen">
        <Header siteName="All You Need Is ..." />
        {children}
        <Footer copyright="SuzumiyaAoba" />
      </body>
    </>
  );
};
