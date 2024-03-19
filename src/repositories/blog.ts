import fs from "fs";
import path from "path";
import type { Markdown } from "@libs/markdown";
import * as markdown from "@libs/markdown";
import { Iterator } from "iterator-helpers-polyfill";

export type PostId = {
  year: string;
  month: string;
  date: string;
  slug: string;
};

export type Post = {
  dir: string;
  id: PostId;
  content: Markdown;
};

export const dirFormat = /(?<year>\d+)-(?<month>\d+)-(?<date>\d+)-(?<slug>.+)/;

const isValidPostDir = (dir: string): boolean => {
  return dirFormat.test(dir);
};

export const dirNameToSlug = (dir: string): PostId => {
  const groups = dir.match(dirFormat)?.groups;

  if (!groups) {
    throw new Error(`Illegal directory name: ${dir}`);
  }

  const { year, month, date, slug} = groups;
  if (!year || !month || !date || !slug) {
    throw new Error(`Illegal directory name: ${dir}`);
  }

  return { year, month, date, slug};
};

const detectMarkdown = (dir: string): string | undefined => {
  const indexMd = path.resolve(process.cwd(), dir, "index.md");
  const indexMdx = path.resolve(process.cwd(), dir, "index.mdx");
  return fs.existsSync(indexMd)
    ? indexMd
    : fs.existsSync(indexMdx)
      ? indexMdx
      : undefined;
};

export const parseMarkdown = async (dir: string): Promise<Markdown> => {
  const path = detectMarkdown(dir);

  if (!path) {
    throw new Error(`Neither index.md nor index.mdx does not exist in ${dir}`);
  }

  return markdown.parseMarkdown(path);
};

export const parsePostDir = async (
  root: string,
  dir: string,
): Promise<Post> => {
  const content = await parseMarkdown(path.resolve(root, dir));

  return {
    dir,
    id: dirNameToSlug(dir),
    content: content,
  };
};

export const getPosts = async (root: string) => {
  const posts = await Promise.all(
    Iterator.from(fs.readdirSync(root))
      .filter(isValidPostDir)
      .map((dir) => parsePostDir(root, dir))
      .toArray(),
  );

  return Iterator.from(posts).filter((post) => !post.content.frontmatter.draft);
};

export const getPost = async (root: string, id: string) => {
  return parsePostDir(root, id);
};
