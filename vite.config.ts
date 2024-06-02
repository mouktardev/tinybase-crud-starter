import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),TanStackRouterVite()],
  resolve: {
		alias: [
			{
				find: "@",
				replacement: fileURLToPath(new URL("./src", import.meta.url)),
			},
		],
	},
})
