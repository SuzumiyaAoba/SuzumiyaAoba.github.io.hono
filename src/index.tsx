import { Hono } from "hono";
import { css } from "hono/css";

import { Header } from "@components/Header";
import { Html } from "@layouts/Html";
import { Layout } from "@layouts/Layout";
import { globalCss } from "@styles/global";

import { tailwindStyleTagInjector } from "@styles/twind.ts";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";

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
    <Html globalCss={globalCss}>
      <Layout>
        <Header siteName="All You Need is ..." />
        <h1 class={headerClass}>Hello!</h1>
      </Layout>
    </Html>,
  );
});

export default app;
