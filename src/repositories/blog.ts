import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Iterator } from "iterator-helpers-polyfill";
import { marked } from "marked";
import { z } from "zod";

export type Post = {
  slug: string;
  content: () => Promise<Markdown>;
};

export type Markdown = {
  frontmatter: Frontmatter;
  content: string;
  html: string;
};

const frontmatterSchema = z.object({
  title: z.string(),
  created_at: z.date(),
  tags: z.array(z.string()),
  draft: z.boolean(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

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
  const markdown = detectMarkdown(dir);

  if (!markdown) {
    throw new Error(`Neither index.md nor index.mdx does not exist in ${dir}`);
  }

  const contents = fs.readFileSync(markdown).toString("utf8");
  const { content, data } = matter(contents);
  const html = await marked(content);
  const frontmatter = frontmatterSchema.parse(data);

  return {
    frontmatter,
    content,
    html,
  };
};

export const parsePostDir = (root: string, dir: string): Post => {
  return {
    slug: `/blog/${dir}/`,
    content: () => parseMarkdown(path.resolve(root, dir)),
  };
};

export const getPosts = async (root: string) => {
  return Iterator.from(fs.readdirSync(root))
    .filter(isValidPostDir)
    .map((dir) => parsePostDir(root, dir));
};
