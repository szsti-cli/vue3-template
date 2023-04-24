import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "virtual:windi.css";
import "virtual:svg-icons-register";

import "./styles/index.scss"; // global css
import "normalize.css/normalize.css"; // a modern alternative to CSS resets

// import "./permission";

import SvgIcon from "./components/SvgIcon/index.vue";

const app = createApp(App);

app.use(store);
app.use(router);

app.component("svg-icon", SvgIcon);

app.mount("#app");
