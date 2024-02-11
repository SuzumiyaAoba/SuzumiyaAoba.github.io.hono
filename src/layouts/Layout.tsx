import { metadata } from "@metadata";

import type { FC, PropsWithChildren } from "hono/jsx";
import { Style } from "hono/css";

import { partytownSnippet } from "@builder.io/partytown/integration";
import { GoogleFonts } from "@components/GoogleFonts";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <head>
        <Style />
        <GoogleFonts fonts={metadata.googleFonts} />
        <script>
          {partytownSnippet()}
        </script>
      </head>
      <body>{children}</body>
    </>
  );
};
