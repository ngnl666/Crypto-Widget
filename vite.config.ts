import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig((mode: ConfigEnv): UserConfig => {
	const env = loadEnv(mode.mode, process.cwd());

	return {
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
			},
		},
		css: {
			preprocessorOptions: {},
		},
		server: {
			host: '0.0.0.0',
			port: Number(env.VITE_PORT),
			open: true,
			cors: true,
		},
		plugins: [
			react(),
			createHtmlPlugin({
				inject: {
					data: {
						title: env.VITE_GLOB_APP_TITLE,
					},
				},
			}),
			eslintPlugin(),
			env.VITE_REPORT && visualizer(),
			env.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: 'gzip',
					ext: '.gz',
				}),
		],
		esbuild: {
			pure: env.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
		},
		build: {
			outDir: 'dist',
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
				},
			},
		},
	};
});
