import { html } from "hono/html";
import type { FC } from "hono/jsx";

const GoogleAnalytics: FC<{
  tagId: string;
}> = ({ tagId }) => {
  return html` <script
      type="text/partytown"
      src=${`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
    ></script>
    <script type="text/partytown">
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "${tagId}");
    </script>`;
};

export default GoogleAnalytics;
