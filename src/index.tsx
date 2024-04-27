import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { ssgParams } from "hono/ssg";

import { Html } from "@layouts/Html";
import { MarkdownLayout } from "@layouts/MarkdownLayout";
import { RootLayout } from "@layouts/RootLayout";
import { BlogPostPage } from "@pages/BlogPostPage";
import { HomePage } from "@pages/HomePage";
import { org } from "@repositories/post/org";
import { globalCss } from "@styles/global";

import { twindConfig } from "@styles/twind.config";
import { tailwindStyleTagInjector } from "@styles/twind.ts";

import { metadata } from "@metadata";
import { NotesPage } from "@pages/NotesPage";

const app = new Hono();

app.use("*", tailwindStyleTagInjector(twindConfig));

app.use("/assets/*", serveStatic({ root: "./public" }));

app.get("/", (c) => {
  return c.html(
    <Html globalCss={globalCss}>
      <RootLayout title={metadata.siteName}>
        <HomePage />
      </RootLayout>
    </Html>
  );
});

app.get("/notes/", async (c) => {
  return c.html(
    <Html globalCss={globalCss}>
      <RootLayout title="Notes">
        <NotesPage />
      </RootLayout>
    </Html>
  );
});

app.get(
  "/blog/:year/:month/:date/:slug/",
  ssgParams(async () => {
    const posts = await org.getPosts();

    return posts.map((post) => ({
      year: post.createdAt.year.toString(),
      month: post.createdAt.month.toString().padStart(2, "0"),
      date: post.createdAt.date.toString().padStart(2, "0"),
      slug: post.slug,
    }));
  }),
  async (c) => {
    const { year, month, date, slug } = c.req.param();

    if (slug === ":slug") {
      return;
    }

    return c.html(
      <Html globalCss={globalCss}>
        <MarkdownLayout title={metadata.siteName}>
          <BlogPostPage dir={`${year}-${month}-${date}-${slug}`} />
        </MarkdownLayout>
      </Html>
    );
  }
);

export default app;
