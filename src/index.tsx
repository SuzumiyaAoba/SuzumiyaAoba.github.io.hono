import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { ssgParams } from "hono/ssg";

import { Html } from "@layouts/Html";
import { Layout } from "@layouts/Layout";
import { BlogPostPage } from "@pages/BlogPostPage";
import { HomePage } from "@pages/HomePage";
import * as blog from "@repositories/blog";
import { globalCss } from "@styles/global";

import { twindConfig } from "@styles/twind.config";
import { tailwindStyleTagInjector } from "@styles/twind.ts";

import { metadata } from "@metadata";

const app = new Hono();

app.use("*", tailwindStyleTagInjector(twindConfig));

app.use("/assets/*", serveStatic({ root: "./public" }));

app.get("/", async (c) => {
  return c.html(
    <Html globalCss={globalCss}>
      <Layout title={metadata.siteName}>
        <HomePage />
      </Layout>
    </Html>,
  );
});

app.get(
  "/blog/:id/",
  ssgParams(async () => {
    const posts = await blog.getPosts("./content/blog");

    return posts
      .map((post) => ({
        id: post.id,
      }))
      .toArray();
  }),
  async (c) => {
    const { id } = c.req.param();

    if (id === ":id") {
      return;
    }

    return c.html(
      <Html globalCss={globalCss}>
        <Layout title={metadata.siteName}>
          <BlogPostPage id={id} />
        </Layout>
      </Html>,
    );
  },
);

export default app;
