import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import path from 'path';
import vueI18n from '@intlify/vite-plugin-vue-i18n';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: { transformAssetUrls },
        }),
        quasar({
            sassVariables: 'src/quasar-variables.sass',
        }),
        vueI18n({
            include: path.resolve(__dirname, './src/locales/**'),
        }),
    ],
    build: {
        target: 'esnext',
    },
});

