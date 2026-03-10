import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: '404.html',
            strict: false
        }),
        // ESTO EVITA QUE EL ERROR DEL LOGO DETENGA TODO
        prerender: {
            handleHttpError: 'warn'
        },
        paths: {
            base: '',
        }
    }
};

export default config;