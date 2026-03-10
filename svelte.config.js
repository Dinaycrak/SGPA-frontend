import adapter from '@sveltejs/adapter-static'; // Importante: debe ser el static
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        // AQUÍ es donde va el bloque del adapter
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: '404.html',
            strict: false 
        }),
        paths: {
            // Esto asegura que los estilos carguen bien en GitHub
            base: process.env.NODE_ENV === 'production' ? '/SGPA-frontend' : '',
        }
    }
};

export default config;