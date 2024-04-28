import fs from "node:fs";

import extractKeywords from "uniorg-extract-keywords";
import uniorgParse from "uniorg-parse";
import uniorg2rehype from "uniorg-rehype";

import rehypeUrlInspector, {
  type HtmlElementNode,
} from "@jsdevtools/rehype-url-inspector";
import rehypeStarryNight from "@microflash/rehype-starry-night";
import rehypeImgLoad from "rehype-imgload";
import rehypeKatex from "rehype-katex";
import rehypePicture from "rehype-picture";
import rehypeStringify from "rehype-stringify";
import remarkEmoji from "remark-emoji";
import joinCjkLines from "remark-join-cjk-lines";
import { unified } from "unified";

//
// Types
//

type Keywords = Map<string, string>;

type Org = {
  keywords: Keywords;
  content: string;
  html: string;
  path: string;
};

//
// Content Processor
//

const processor = unified()
  .use(uniorgParse)
  .use(uniorg2rehype)
  .use(rehypeUrlInspector, {
    inspectEach: ({ url, node, propertyName }) => {
      for (const prepareUrl of prepareUrlFuncs) {
        prepareUrl({ url, node, propertyName });
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

type InspectEeachParams = {
  url: string;
  node: HtmlElementNode;
  propertyName: string | undefined;
};

const prepareBlogUrl = ({ url, node, propertyName }: InspectEeachParams) => {
  if (!(node.properties && propertyName)) {
    console.error("Invalid parameters for prepareBlogUrl");
    return;
  }

  const prefix = "blog://";
  if (url.startsWith(prefix)) {
    const [year, month, date, ...slugFragments] = url
      .slice(prefix.length)
      .split("-");
    const slug = slugFragments.join("-");

    node.properties[propertyName] = `/blog/${year}/${month}/${date}/${slug}/`;
  }
};

const prepareUrlFuncs = [prepareBlogUrl];

//
// Keyword Processor
//

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

  return keywordMap;
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

//
// exports
//

export type { Org, Keywords };
export { parseOrg, parseKeywords };
