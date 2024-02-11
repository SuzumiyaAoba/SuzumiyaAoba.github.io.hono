import { html } from "hono/html";
import type { FC } from "hono/jsx";

type Props = {
  tagId: string;
};

export const GoogleAnalytics: FC<Props> = ({ tagId }) => {
  return html`
    <script
       type="text/partytown"
       src="https://www.googletagmanager.com/gtag/js?id=G-Q3Z18PS7B4"></script>
    <script type="text/partytown">
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "${tagId}");
      </script>}`;
};
