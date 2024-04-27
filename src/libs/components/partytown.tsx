import { partytownSnippet } from "@builder.io/partytown/integration";
import { raw } from "hono/html";
import type { FC } from "hono/jsx";

const Partytown: FC = () => {
  return (
    <>
      <script>{raw(partytownSnippet())}</script>
    </>
  );
};

export default Partytown;
