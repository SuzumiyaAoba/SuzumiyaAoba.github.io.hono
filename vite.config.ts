import devServer from "@hono/vite-dev-server";
import { defaultOptions } from "@hono/vite-dev-server";
import ssg from "@hono/vite-ssg";
import { globSync } from "glob";
import copy from "rollup-plugin-copy";
import type { Target } from "rollup-plugin-copy";
import sharp from "sharp";
import { defineConfig } from "vite";
import VitePluginBrowserSync from "vite-plugin-browser-sync";
import Sitemap from "vite-plugin-sitemap";
import tsconfigPaths from "vite-tsconfig-paths";

const imageTarget: (options: {
  src: string;
  width: number;
  format: keyof sharp.FormatEnum;
}) => Target[] = ({ src, width, format }) =>
  globSync(src).map((file) => {
    const groups = file.match(/content\/blog\/(?<year>\d+)-(?<month>\d+)-(?<date>\d+)-(?<id>[^/]+)\/images\//)?.groups;

    if (!groups) {
      throw new Error(`Illegal src: ${src}`);
    }

    const { year, month, date, id } = groups;

    return {
      src: file,
      transform: (contents, _filename) => {
        return sharp(contents).resize(width).toFormat(format).toBuffer();
      },
      rename: (name, _extension, _fullPath) => `${name}.${format}`,
      dest: `public/blog/${year}/${month}/${date}/${id}/images`,
    };
  });

const blogImageTarget: (options: {
  format: keyof sharp.FormatEnum;
}) => Target[] = ({ format }) =>
  imageTarget({
    src: "content/blog/**/images/*.{png,jpg,jpeg}",
    width: 768 * 2,
    format,
  });

export default defineConfig({
  build: {
    copyPublicDir: true,
    watch: {
      include: "content/**",
    },
  },
  plugins: [
    tsconfigPaths(),
    devServer({
      entry: "src/index.tsx",
      exclude: [/^\/blog\/.+\.(webp|png|jpg|jpeg)$/, ...defaultOptions.exclude],
    }),
    // @ts-ignore
    VitePluginBrowserSync(),
    {
      name: "watch-external",
      async buildStart() {
        const files = globSync("content/**/*.md");
        for (const file of files) {
          this.addWatchFile(file);
        }
      },
    },
    copy({
      targets: [
        ...blogImageTarget({ format: "webp" }),
        ...blogImageTarget({ format: "png" }),
      ],
      flatten: true,
      verbose: true,
      hook: "buildStart",
    }),
    ssg(),
    // @ts-ignore
    Sitemap({
      hostname: "https://SuzumiyaAoba.github.io/",
    }),
  ],
});
