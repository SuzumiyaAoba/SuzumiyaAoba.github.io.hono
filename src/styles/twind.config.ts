import { defineConfig } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";

export const twindConfig = defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
  theme: {
    fontFamily: {
      "sans": ["IBM Plex Sans JP", "sans-serf"],
      "mono":["M PLUS 1 Code", "monospace"],
      "display": ["Pacifico", "system-ui"],
    },
  },
});
