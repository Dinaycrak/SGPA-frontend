import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html' 
		}),
		paths: {
			// Si tu repo se llama "mi-proyecto", pon '/mi-proyecto'
			// Si es tu sitio principal (nombre.github.io), deja la cadena vacía ''
			base: process.env.NODE_ENV === 'production' ? 'https://dinaycrak.github.io/SGPA-frontend/' : '',
		}
	}
};

export default config;