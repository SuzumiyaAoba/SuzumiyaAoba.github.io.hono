import { partytownSnippet } from "@builder.io/partytown/integration";
import { raw } from "hono/html";
import type { FC } from "hono/jsx";

export const Partytown: FC = () => {
  return (
    <>
      <script>{raw(partytownSnippet())}</script>
    </>
  );
};
