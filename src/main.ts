// Import icon libraries
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import 'quasar/src/css/index.sass'
import { Loading, Notify, Quasar } from 'quasar';
// Import Quasar lang
import langPtBr from 'quasar/lang/pt-BR';
// Import Quasar css
import { createApp } from 'vue';
import pt_br from '../src/locales/pt_br.json';
import App from './App.vue';
import { setupI18n } from './i18n';
import router from './router';
import { store } from './store';

const i18n = setupI18n({
    legacy: false,
    globalInjection: true,
    locale: 'pt_br',
    fallbackLocale: 'pt_br',
    messages: {
        pt_br,
    },
});

createApp(App)
    .use(store)
    .use(router)
    .use(Quasar, {
        plugins: { Notify, Loading },
        lang: langPtBr,
        config: {
            notify: {},
        },
    })
    .use(i18n)
    .mount('#app');

