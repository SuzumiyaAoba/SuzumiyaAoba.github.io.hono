import { Hono } from "hono";
import { Style, css } from "hono/css";

import { Header } from "@components/Header";
import { Layout } from "@layouts/Layout";

import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";
import { tailwindStyleTagInjector } from "./twind.ts";

const app = new Hono();

app.use(
  "*",
  tailwindStyleTagInjector({
    presets: [presetAutoprefix(), presetTailwind()],
  }),
);

app.get("/", (c) => {
  const headerClass = css``;

  return c.html(
    <Layout>
      <head>
        <Style />
      </head>
      <body>
        <Header siteName="All You Need is ..." />
        <h1 class={headerClass}>Hello!</h1>
      </body>
    </Layout>,
  );
});

export default app;
