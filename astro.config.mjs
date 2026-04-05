import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://lastagous.com",
  base: "",
  output: "static",
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  build: {
    assets: "_assets",
  },
});
