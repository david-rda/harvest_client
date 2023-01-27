import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

const user = JSON.parse(localStorage.getItem("user")) || null

import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers['Authorization'] = 'Bearer ' + (user ? user.token : 'false')

import { BIconPlusLg, BIconFolder2, BIconInfoLg, BIconPower, BIconPersonCircle, BIconShieldCheck, BIconBoxArrowRight, BIconXLg, BIconDownload, BIconGearFill, BIconFiletypePdf } from "bootstrap-icons-vue";

app.component("BIconPower", BIconPower);
app.component("BIconPlusLg", BIconPlusLg);
app.component("BIconFolder2", BIconFolder2);
app.component("BIconInfoLg", BIconInfoLg);
app.component("BIconPersonCircle", BIconPersonCircle);
app.component("BIconShieldCheck", BIconShieldCheck);
app.component("BIconBoxArrowRight", BIconBoxArrowRight);
app.component("BIconXLg", BIconXLg);
app.component("BIconDownload", BIconDownload);
app.component("BIconGearFill", BIconGearFill);
app.component("BIconFiletypePdf", BIconFiletypePdf);

import router from "./routes/routes";

app.use(router);

import store from "@/store/store";

app.use(store);

app.mount("#app");