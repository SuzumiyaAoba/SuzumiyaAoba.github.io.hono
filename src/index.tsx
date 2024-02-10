import { Hono } from "hono";
import { Style, css } from "hono/css";
import { Layout } from "@layouts/Layout";

const app = new Hono();

app.get("/", (c) => {
  const headerClass = css``;

  return c.html(
    <Layout>
      <head>
        <Style />
      </head>
      <body>
        <h1 class={headerClass}>Hello!</h1>
      </body>
    </Layout>,
  );
});

export default app;
