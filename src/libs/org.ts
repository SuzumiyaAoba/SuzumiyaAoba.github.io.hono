import fs from "node:fs";
import { z } from "zod";

import extractKeywords from "uniorg-extract-keywords";
import uniorgParse from "uniorg-parse";
import uniorg2rehype from "uniorg-rehype";

import rehypeUrlInspector from "@jsdevtools/rehype-url-inspector";
import rehypeStarryNight from "@microflash/rehype-starry-night";
import rehypeImgLoad from "rehype-imgload";
import rehypeKatex from "rehype-katex";
import rehypePicture from "rehype-picture";
import rehypeStringify from "rehype-stringify";
import remarkEmoji from "remark-emoji";
import joinCjkLines from "remark-join-cjk-lines";
import { unified } from "unified";

type Org = {
  keywords: Keywords;
  content: string;
  html: string;
  path: string | undefined;
};

const keywordsSchema = z.object({
  title: z.string(),
  date: z.date(),
  tags: z.array(z.string()),
  categories: z.array(z.string()),
  draft: z.boolean(),
});

type Keywords = z.infer<typeof keywordsSchema>;

const processor = unified()
  .use(uniorgParse)
  .use(uniorg2rehype)
  .use(rehypeUrlInspector, {
    inspectEach: ({ url, node, propertyName }) => {
      if (url.startsWith("blog://")) {
        const [year, month, date, ...slug] = url.slice(7).split("-");

        // @ts-ignore
        node.properties[propertyName] =
          `/blog/${year}/${month}/${date}/${slug.join("-")}/`;
      }
    },
  })
  .use(rehypePicture, {
    jpg: { webp: "image/webp" },
    png: { webp: "image/webp" },
  })
  .use(rehypeImgLoad, {
    mode: "lazy",
  })
  .use(remarkEmoji)
  .use(joinCjkLines)
  .use(rehypeKatex)
  .use(rehypeStarryNight)
  .use(rehypeStringify, { allowDangerousHtml: true });

const keywordProcessor = unified()
  .use(uniorgParse)
  .use(extractKeywords)
  .use(uniorg2rehype);

const parseKeywords = (content: string): Keywords => {
  const result = keywordProcessor.parse(content);

  if (result.type !== "org-data") {
    throw new Error("Expected org-data");
  }
  if (!("children" in result)) {
    throw new Error("Expected children");
  }
  if (!Array.isArray(result.children)) {
    throw new Error("Expected children to be an array");
  }

  const keywordMap = new Map<string, string>();
  for (const keyword of result.children) {
    if (keyword.type === "keyword") {
      keywordMap.set(keyword.key.toLowerCase(), keyword.value);
    }
  }

  const keywords = {
    title: keywordMap.get("title") ?? "",
    date: new Date(keywordMap.get("date") ?? ""),
    tags: (keywordMap.get("tags[]") ?? "").split(" ").map((tag) => tag.trim()),
    categories: (keywordMap.get("categories[]") ?? "")
      .split(" ")
      .map((category) => category.trim()),
    draft: keywordMap.get("draft") === "true",
  };

  return keywordsSchema.parse(keywords);
};

const parseOrg = async (path: string): Promise<Org> => {
  const contents = fs.readFileSync(path).toString("utf8");
  const keywords = parseKeywords(contents);
  const file = await processor.process(contents);
  const html = String(file);

  return {
    keywords,
    content: contents,
    html,
    path,
  };
};

export type { Org, Keywords };
export { parseOrg };
