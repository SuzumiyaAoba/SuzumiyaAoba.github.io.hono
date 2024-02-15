import {globSync} from "glob";
import devServer from "@hono/vite-dev-server";
import { defaultOptions } from "@hono/vite-dev-server";
import ssg from "@hono/vite-ssg";
import copy from "rollup-plugin-copy";
import type { Target } from "rollup-plugin-copy";
import sharp from "sharp";
import { defineConfig } from "vite";
import VitePluginBrowserSync from "vite-plugin-browser-sync";
import tsconfigPaths from "vite-tsconfig-paths";


const imageTarget: (options: {
  src: string;
  width: number;
  format: keyof sharp.FormatEnum;
}) => Omit<Target, "dest"> = ({ src, width, format }) => ({
  src,
  transform: (contents, _filename) => {
    return sharp(contents).resize(width).toFormat(format).toBuffer();
  },
  rename: (name, _extension, _fullPath) => `${name}.${format}`,
});

const blogImageTarget: (options: { format: keyof sharp.FormatEnum }) => Target =
  ({ format }) => ({
    ...imageTarget({
      src: "content/**/images/*.{png,jpg,jpeg}",
      width: 768 * 2,
      format,
    }),
    dest: "public",
  });

export default defineConfig({
  build: {
    copyPublicDir: true,
    watch: {
      include: "content/**",
    }
  },
  plugins: [
    copy({
      targets: [
        blogImageTarget({ format: "webp" }),
        blogImageTarget({ format: "png" }),
      ],
      flatten: false,
      verbose: true,
      hook: "buildStart",
    }),
    tsconfigPaths(),
    devServer({
      entry: "src/index.tsx",
      exclude: [/^\/blog\/.+\.(webp|png|jpg|jpeg)$/, ...defaultOptions.exclude],
    }),
    VitePluginBrowserSync(),
    ssg(),
    {
      name: 'watch-external',
      async buildStart(){
        const files = globSync("content/**/*.md");
        for(let file of files){
          this.addWatchFile(file);
        }
      }
    }
  ],
});
