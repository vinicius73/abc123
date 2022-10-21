import { createApp } from "vue";
import { Quasar } from "quasar";
import quasarLang from "quasar/lang/pt-BR";
import quasarIconSet from "quasar/icon-set/svg-mdi-v6";

import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/mdi-v6/mdi-v6.css";

import "@quasar/extras/animate/shake.css";

import "quasar/src/css/index.sass";
import Root from "./Root.vue";

import router from './router'

const app = createApp(Root);

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
  iconSet: quasarIconSet,
  /*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
});

app.use(router)
app.mount("#app");
