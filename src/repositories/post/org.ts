import fs from "node:fs";
import { Iterator } from "iterator-helpers-polyfill";

import { parseOrg } from "@libs/org/blog.ts";
import type { GetPostsOptions, Post, PostRegistory } from "./post.ts";

const idRegex = /(?<year>\d+)-(?<month>\d+)-(?<date>\d+)-(?<slug>.+)/;

class OrgPostRegistory implements PostRegistory {
  private readonly root: string;

  constructor(root: string) {
    this.root = root;
  }

  async getPosts(options?: GetPostsOptions): Promise<Post[]> {
    const allPosts = await Promise.all(
      Iterator.from(fs.readdirSync(this.root, { withFileTypes: true }))
        .filter((dirent) => dirent.isDirectory())
        .filter((dirent) => idRegex.test(dirent.name))
        .map((dirnet) => dirnet.name)
        .map(async (dirname) => await this.getPost(dirname))
        .toArray(),
    );
    const filteredPosts = allPosts
      .filter((post) => {
        if (!post) {
          return false;
        }
        if (options?.draft === true) {
          return true;
        }

        return !post.draft;
      })
      .filter((post): post is Post => post !== undefined);

    return filteredPosts;
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
      tags: org.keywords.tags,
      categories: org.keywords.categories,
      html: org.html,
    };
  }
}

const org = new OrgPostRegistory(`${process.cwd()}/content/blog`);

export { org, OrgPostRegistory };
