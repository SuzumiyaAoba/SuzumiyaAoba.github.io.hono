import fs from "node:fs";
import { z } from "zod";
import { parseKeywords } from "./org";

type BlogOrg = {
  keywords: BlogKeywords;
  content: string;
  html: string;
  path: string | undefined;
};

const blogKeywordsSchema = z.object({
  title: z.string(),
  date: z.date(),
  tags: z.array(z.string()),
  categories: z.array(z.string()),
  draft: z.boolean(),
});

type BlogKeywords = z.infer<typeof blogKeywordsSchema>;

const parseBlogKeywords = (rawString: string): BlogKeywords => {
  const keywordMap = parseKeywords(rawString);

  const keywords = {
    title: keywordMap.get("title") ?? "",
    date: new Date(keywordMap.get("date") ?? ""),
    tags: (keywordMap.get("tags[]") ?? "").split(" ").map((tag) => tag.trim()),
    categories: (keywordMap.get("categories[]") ?? "")
      .split(" ")
      .map((category) => category.trim()),
    draft: keywordMap.get("draft") === "true",
  };

  return blogKeywordsSchema.parse(keywords);
};

const parseOrg = async (path: string): Promise<BlogOrg> => {
  const rawString = fs.readFileSync(path).toString("utf8");
  const org = await parseOrg(rawString);
  const keywords = parseBlogKeywords(rawString);

  return {
    keywords,
    content: rawString,
    html: org.html,
    path,
  };
};

export type { BlogOrg as Org, BlogKeywords as Keywords };
export { parseOrg };
