export type Note = {
  id: string;
  title: string;
  slug: string;
  draft: boolean;
  html: string;
};

export type GetNotesOptions = {
  draft: boolean;
};

export const DEFAULT_GET_NOTES_OPTIONS: GetNotesOptions = {
  draft: false,
} as const;

export interface NoteRegistory {
  getNotes(category: string, options?: GetNotesOptions): Promise<Note[]>;

  getNote(category: string, id: string): Promise<Note | undefined>;

  getCategories(): Promise<string[]>;
}
