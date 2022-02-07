import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

const opts = {};
const VuetifyInstance = new Vuetify(opts);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify: VuetifyInstance,
  render: (h) => h(App),
}).$mount("#app");
