import Giscus from "@libs/components/giscus";
import { metadata } from "@metadata";
import { orgNotes } from "@repositories/note/org";
import postMarkdownStyle from "@styles/markdown";
import { raw } from "hono/html";
import type { FC } from "hono/jsx";

export const NotePage: FC<{
  category: string;
  id: string;
}> = async ({ category, id }) => {
  const note = await orgNotes.getNote(category, id);

  if (!note) {
    return <div>404 Not Found</div>;
  }

  return (
    <main className="flex-grow w-full max-w-3xl mx-auto mt-8 mb-12">
      <article class="mb-16">
        <h1 class="flex my-8 justify-center font-black text-2xl">
          <a class="no-underline" href={`/notes/${category}/${id}/`}>
            {note.title}
          </a>
        </h1>
        <div class={postMarkdownStyle}>{raw(note.html)}</div>
      </article>
      <hr />
      <section class="mt-16">
        <Giscus {...metadata.giscus} />
      </section>
    </main>
  );
};
