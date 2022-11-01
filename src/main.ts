import { createApp } from "vue";
import PrimeVue from 'primevue/config';
import App from "./App.vue";
import router from "./router";

import "./main.css"

const app = createApp(App);
app.use(PrimeVue);
app.use(router);

app.mount("#app");
