import devServer from "@hono/vite-dev-server";
import ssg from "@hono/vite-ssg";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    ssg(),
    tsconfigPaths(),
    devServer({
      entry: "src/index.tsx",
    }),
  ],
});
