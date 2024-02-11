import {
  type BaseTheme,
  type Preset,
  type TwindUserConfig,
  inline,
  install,
} from "@twind/core";
import { createMiddleware } from "hono/factory";

// see: https://techblog.raksul.com/entry/2023/11/08/173335
export const tailwindStyleTagInjector = <
  Theme extends BaseTheme,
  // biome-ignore lint/suspicious/noExplicitAny: type of external library
  Presets extends Preset<any>[] = Preset[],
>(
  config: TwindUserConfig<Theme, Presets>,
) => {
  install(config);

  return createMiddleware(async (c, next) => {
    await next();

    if (!c.res.body) {
      return;
    }

    const html = await new Response(c.res.body).text();
    const inserted_html = inline(html);

    c.res = new Response(inserted_html, c.res);
  });
};
