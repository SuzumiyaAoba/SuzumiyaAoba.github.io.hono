import { z } from "zod";
import { parseKeywords, parseOrg } from "./org";

//
// Types
//

type NoteOrg = {
  keywords: NoteKeywords;
  content: string;
  html: string;
  path: string | undefined;
};

const noteKeyowrdsSchema = z.object({
  title: z.string(),
  draft: z.boolean(),
});

type NoteKeywords = z.infer<typeof noteKeyowrdsSchema>;

//
// Keyword Processor
//

const parseNoteKeywords = (rawString: string): NoteKeywords => {
  const keywordMap = parseKeywords(rawString);

  const keywords = {
    title: keywordMap.get("title") ?? "",
    draft: keywordMap.get("draft") === "true",
  };

  return noteKeyowrdsSchema.parse(keywords);
};

//
// Parser
//

const parseNoteOrg = async (path: string): Promise<NoteOrg> => {
  const org = await parseOrg(path);
  const keywords = parseNoteKeywords(org.content);

  return {
    keywords,
    content: org.content,
    html: org.html,
    path,
  };
};

//
// exportrs
//

export type { NoteOrg, NoteKeywords };
export { parseNoteOrg };
