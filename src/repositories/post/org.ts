import fs from "node:fs";
import { Iterator } from "iterator-helpers-polyfill";

import { parseOrg } from "@libs/org.ts";
import type { GetPostsOptions, Post, PostRegistory } from "./post.ts";

const idRegex = /(?<year>\d+)-(?<month>\d+)-(?<date>\d+)-(?<slug>.+)/;

class OrgPostRegistory implements PostRegistory {
  constructor(private readonly root: string) {
    // Do nothing
  }

  async getPosts(options?: GetPostsOptions): Promise<Post[]> {
    const posts = await Promise.all(
      Iterator.from(fs.readdirSync(this.root, { withFileTypes: true }))
        .filter((dirent) => dirent.isDirectory())
        .filter((dirent) => idRegex.test(dirent.name))
        .map((dirnet) => dirnet.name)
        .map((dirname) => this.getPost(dirname))
        .filter(async (postPromise) => {
          const post = await postPromise;

          if (!post) {
            return false;
          }

          return !options?.draft || !post.draft;
        })
        .toArray(),
    );

    return posts.filter((post): post is Post => post !== undefined) as Post[];
  }

  async getPost(id: string): Promise<Post | undefined> {
    if (!idRegex.test(id)) {
      return undefined;
    }

    const path = `${this.root}/${id}/index.org`;
    const org = await parseOrg(path);

    const groups = id.match(idRegex)?.groups;
    if (!groups) {
      return undefined;
    }
    const { slug } = groups;
    if (!slug) {
      return undefined;
    }

    return {
      id,
      title: org.keywords.title,
      slug,
      createdAt: {
        year: org.keywords.date.getFullYear(),
        month: org.keywords.date.getMonth() + 1,
        date: org.keywords.date.getDate(),
      },
      draft: org.keywords.draft,
      categories: [],
      tags: org.keywords.tags,
      html: org.html,
    };
  }
}

const org = new OrgPostRegistory(`${process.cwd()}/content/blog`);

export { org, OrgPostRegistory };
