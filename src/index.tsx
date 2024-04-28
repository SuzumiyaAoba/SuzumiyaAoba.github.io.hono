import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { ssgParams } from "hono/ssg";

import { Html } from "@layouts/Html";
import { MarkdownLayout } from "@layouts/MarkdownLayout";
import { RootLayout } from "@layouts/RootLayout";
import { BlogPostPage } from "@pages/BlogPostPage";
import { HomePage } from "@pages/HomePage";
import { orgPosts } from "@repositories/post/org";
import { globalCss } from "@styles/global";

import { twindConfig } from "@styles/twind.config";
import { tailwindStyleTagInjector } from "@styles/twind.ts";

import { metadata } from "@metadata";
import { NotesPage } from "@pages/NotesPage";
import { orgNotes } from "@repositories/note/org";
import { NotePage } from "@pages/NotePage";

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
  "/notes/:category/:slug/",
  ssgParams(async () => {
    const categories = await orgNotes.getCategories();

    const promises = categories.flatMap(async (category) => {
      const notes = await orgNotes.getNotes(category);

      return notes.map((note) => ({
        category,
        slug: note.slug,
      }));
    });

    return (await Promise.all(promises)).flat();
  }),
  async (c) => {
    const { category, slug } = c.req.param();

    if (category === ":category" || slug === ":slug") {
      return;
    }

    return c.html(
      <Html globalCss={globalCss}>
        <MarkdownLayout title={metadata.siteName}>
          <NotePage category={category} id={slug} />
        </MarkdownLayout>
      </Html>
    );
  }
);

app.get(
  "/blog/:year/:month/:date/:slug/",
  ssgParams(async () => {
    const posts = await orgPosts.getPosts();

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
