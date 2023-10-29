/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "../router";
import { createPinia } from "pinia";
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/css/index.css';
const pinia = createPinia();
export function registerPlugins(app) {
  loadFonts();
  app.use(pinia).use(router).use(vuetify);
}
