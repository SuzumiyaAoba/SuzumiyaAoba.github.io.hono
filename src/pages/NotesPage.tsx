import type { FC } from "hono/jsx";

type NotesPageProps = unknown;

export const NotesPage: FC<NotesPageProps> = async () => {
  return (
    <main class="flex flex-col text-center">
      <h1 class="font-display">Notes</h1>
      <h2 class="font-serif">キーボード</h2>
    </main>
  );
};
