import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import { BIconPlusLg, BIconFolder2, BIconInfoLg, BIconPower } from "bootstrap-icons-vue";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//import VueTheMask from 'vue-the-mask';
//https://vuejs-tips.github.io/vue-the-mask/

import router from "./routes/routes"; // პლიკაციაში განსაზღვრული მარშუტები
import store from "@/store/store";

const user = JSON.parse(localStorage.getItem("user")) || null

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers['Authorization'] = 'Bearer ' + (user ? user.token : 'false')

const app = createApp(App);

app.component("BIconPower", BIconPower);
app.component("BIconPlusLg", BIconPlusLg);
app.component("BIconFolder2", BIconFolder2);
app.component("BIconInfoLg", BIconInfoLg);

app.use(router);
app.use(VueSweetalert2);
app.use(store);
//app.use(VueTheMask);

app.mount("#app");