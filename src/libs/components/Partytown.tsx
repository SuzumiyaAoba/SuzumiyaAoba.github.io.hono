import { partytownSnippet } from "@builder.io/partytown/integration";
import type { FC } from "hono/jsx";

export const Partytown: FC = () => {
  return (
    <>
      <script>{partytownSnippet()}</script>
    </>
  );
};
