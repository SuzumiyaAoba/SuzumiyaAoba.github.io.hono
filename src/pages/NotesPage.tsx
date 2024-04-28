import { css } from "@twind/core";
import type { FC } from "hono/jsx";

type NotesPageProps = unknown;

export const NotesPage: FC<NotesPageProps> = async () => {
  const style = css`
    main {
      @apply flex flex-col max-w-3xl w-full mx-auto mt-8;
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
      @apply list-disc px-8;
      @apply rounded-md;
    }
  `;

  return (
    <main class={style}>
      <h1>Notes</h1>
      <ul>
        <li>
          <section>
            <h2>キーボード</h2>
            <ul>
              <li>キーボード購入歴</li>
            </ul>
          </section>
        </li>
        <li>
          <sectino>
            <h2>形式言語</h2>
          </sectino>
        </li>
      </ul>
    </main>
  );
};
