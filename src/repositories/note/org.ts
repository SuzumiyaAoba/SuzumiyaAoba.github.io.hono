import fs from "node:fs";
import { parseNoteOrg } from "@libs/org/note";
import { Iterator } from "iterator-helpers-polyfill";
import type { GetNotesOptions, Note, NoteRegistory } from "./note";

class OrgNoteRegistry implements NoteRegistory {
  private readonly root: string;

  constructor(root: string) {
    this.root = root;
  }

  async getNotes(category: string, options?: GetNotesOptions): Promise<Note[]> {
    const dir = `${this.root}/${category}`;
    const allNotes = await Promise.all(
      Iterator.from(fs.readdirSync(dir, { withFileTypes: true }))
        .filter((dirent) => dirent.isDirectory())
        .map((dirnet) => dirnet.name)
        .map(async (dirname) => await this.getNote(category, dirname))
        .toArray(),
    );

    const filteredNotes = allNotes
      .filter((note) => {
        if (!note) {
          return false;
        }
        if (options?.draft === true) {
          return true;
        }

        return !note.draft;
      })
      .filter((note): note is Note => note !== undefined);

    return filteredNotes;
  }

  async getNote(category: string, id: string): Promise<Note | undefined> {
    const path = `${this.root}/${category}/${id}/index.org`;
    const org = await parseNoteOrg(path);

    return {
      id,
      title: org.keywords.title,
      slug: id,
      draft: org.keywords.draft,
      html: org.html,
    };
  }

  async getCategories(): Promise<string[]> {
    return fs
      .readdirSync(this.root, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirnet) => dirnet.name);
  }
}

const orgNotes = new OrgNoteRegistry(`${process.cwd()}/content/notes`);

export { orgNotes, OrgNoteRegistry };
