import { z } from "zod";
import { parseKeywords, parseOrg } from "./org";

//
// Types
//

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

//
// Keyword Processor
//

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

//
// Parser
//

const parseBlogOrg = async (path: string): Promise<BlogOrg> => {
  const org = await parseOrg(path);
  const keywords = parseBlogKeywords(org.content);

  return {
    keywords,
    content: org.content,
    html: org.html,
    path,
  };
};

//
// exports
//

export type { BlogOrg, BlogKeywords };
export { parseBlogOrg };
