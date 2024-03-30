import { test } from "vitest";

import extractKeywords from "uniorg-extract-keywords";
import uniorgParse from "uniorg-parse";
import uniorg2rehype from "uniorg-rehype";

import { unified } from "unified";

const keywordProcessor = unified()
  .use(uniorgParse)
  .use(extractKeywords)
  .use(uniorg2rehype);

test("uniorg-parse", () => {
  const content = `
#+TITLE: Hello, World!
#+DATE: 2021-08-24
#+TAGS: hello, world
#+KEYWORDS[]: keyword1 keyword`;

  keywordProcessor.parse(content);
});
