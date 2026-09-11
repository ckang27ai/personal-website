import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Nitro picks the deploy target at build time: the Vercel preset when building on Vercel,
// a standalone Node server (.output/server/index.mjs) everywhere else.
export default defineConfig({
  server: { port: 8080 },
  plugins: [tsConfigPaths(), tailwindcss(), tanstackStart(), nitro(), viteReact()],
});
