import { Html } from "@layouts/Html";
import { Layout } from "@layouts/Layout";
import { Home } from "@pages/Home";
import { globalCss } from "@styles/global";
import { Hono } from "hono";

import { twindConfig } from "@styles/twind.config";
import { tailwindStyleTagInjector } from "@styles/twind.ts";

const app = new Hono();

app.use("*", tailwindStyleTagInjector(twindConfig));

app.get("/", (c) => {
  return c.html(
    <Html globalCss={globalCss}>
      <Layout>
        <Home />
      </Layout>
    </Html>,
  );
});

export default app;
