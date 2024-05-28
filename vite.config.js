import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: process.env.NODE_ENV === 'production' ? '/projects/happyhome/' : '/',
	resolve: {
		alias: {

			'@': path.resolve(__dirname, 'src'),
			'@components': `${path.resolve(__dirname, 'src/components/')}`,
			'@img': `${path.resolve(__dirname, 'src/assets/images/')}`,
			'@helpers': `${path.resolve(__dirname, 'src/helpers/')}`,
			'@context': `${path.resolve(__dirname, 'src/context/')}`,
			'@api': `${path.resolve(__dirname, 'src/api/services/')}`,
			'@pages': path.resolve(__dirname, 'src/pages'),
			// public: `${path.resolve(__dirname, "./public/")}`,
			// types: `${path.resolve(__dirname, "./src/@types")}`,
		},
	},
})
