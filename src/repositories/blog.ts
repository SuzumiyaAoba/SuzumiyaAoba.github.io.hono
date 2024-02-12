import fs from "fs";
import path from "path";
import type { Markdown } from "@libs/markdown";
import * as markdown from "@libs/markdown";
import { Iterator } from "iterator-helpers-polyfill";

export type Post = {
  id: string;
  slug: string;
  content: () => Promise<Markdown>;
};

const dirFormat = /(?<dateStr>\d+-\d+-\d+)-(?<id>.+)/;

const isValidPostDir = (dir: string): boolean => {
  return dirFormat.test(dir);
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

export const parsePostDir = (root: string, dir: string): Post => {
  return {
    id: dir,
    slug: `/blog/${dir}/`,
    content: () => parseMarkdown(path.resolve(root, dir)),
  };
};

export const getPosts = async (root: string) => {
  return Iterator.from(fs.readdirSync(root))
    .filter(isValidPostDir)
    .map((dir) => parsePostDir(root, dir));
};

export const getPost = async (root: string, id: string) => {
  return parsePostDir(root, id);
};
