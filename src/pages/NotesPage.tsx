import { orgNotes } from "@repositories/note/org";
import { css } from "@twind/core";
import type { FC } from "hono/jsx";

const style = css`
  main {
    @apply flex-grow;
    @apply w-full max-w-3xl;
    @apply mx-auto mt-8 mb-12;
  }

  h1 {
    @apply text-center mb-12 font-display text-2xl;
  }

  h2 {
    @apply text-center;
    @apply font-accent font-bold;
  }

  main > ul {
    @apply grid grid-col-1 md:grid-cols-2 gap-8;
  }

  section > ul {
    @apply list-none;
    @apply px-8;
    @apply rounded-md;
  }

  a {
    @apply hover:underline hover:decoration-dotted;
  }
`;

export const NotesPage: FC<unknown> = async () => {
  const keyboardNotes = await orgNotes.getNotes("keyboard");
  const formalLanguageNotes = await orgNotes.getNotes("formal-languages");

  return (
    <main class={style}>
      <h1>Notes</h1>
      <ul>
        <li>
          <section>
            <h2>キーボード</h2>
            <ul>
              {keyboardNotes.map((note) => (
                <li className="text-center">
                  <a href={`/notes/keyboard/${note.slug}/`}>{note.title}</a>
                </li>
              ))}
            </ul>
          </section>
        </li>
        <li>
          <sectino>
            <h2>形式言語</h2>
            <ul>
              {formalLanguageNotes.map((note) => (
                <li className="text-center">
                  <a href={`/notes/formal-languages/${note.slug}/`}>
                    {note.title}
                  </a>
                </li>
              ))}
            </ul>
          </sectino>
        </li>
      </ul>
    </main>
  );
};
