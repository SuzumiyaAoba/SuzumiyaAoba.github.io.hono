import {
  type BaseTheme,
  type ExtractThemes,
  type Preset,
  type TwindConfig,
  inline,
  install,
} from "@twind/core";
import type { TailwindTheme } from "@twind/preset-tailwind";
import { createMiddleware } from "hono/factory";

// see: https://techblog.raksul.com/entry/2023/11/08/173335
export const tailwindStyleTagInjector = <
  Theme extends BaseTheme,
  Presets extends Preset<unknown>[] = Preset<unknown>[],
>(
  config: TwindConfig<
    BaseTheme & TailwindTheme & ExtractThemes<Theme, Presets>
  >,
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
