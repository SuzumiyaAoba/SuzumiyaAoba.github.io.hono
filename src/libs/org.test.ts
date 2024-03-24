import { test } from 'vitest';

import uniorg2rehype from "uniorg-rehype";
import uniorgParse from "uniorg-parse";
import extractKeywords from "uniorg-extract-keywords";

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
  
  const parsed = keywordProcessor.parse(content);

  console.log(parsed);
});
