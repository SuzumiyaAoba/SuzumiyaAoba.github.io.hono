import { type BaseTheme, type PartialTheme, defineConfig } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";

// workaround: https://github.com/denoland/fresh/issues/1633#issuecomment-1680135412
declare type ThemeConfig<Theme extends BaseTheme = BaseTheme> =
  PartialTheme<Theme> & {
    extend?: PartialTheme<Theme>;
  };

export const twindConfig = defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans JP", "sans-serf"],
        serif: ["Shippori Mincho", "serif"],
        mono: ["M PLUS 1 Code", "monospace"],
        display: ["Pacifico", "system-ui"],
      },
    },
  } as ThemeConfig,
});
