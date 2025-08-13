import { fileURLToPath, URL } from 'node:url';

import { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ViteSSGOptions } from 'vite-ssg';

// https://vite.dev/config/
export default {
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	build: {
		outDir: 'www',
		emptyOutDir: true,
	},
	ssgOptions: {
		mock: true,
	},
} satisfies UserConfig & { ssgOptions?: ViteSSGOptions };
