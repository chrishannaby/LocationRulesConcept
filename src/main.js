import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";
import { inspect } from "@xstate/inspect";

inspect({
  iframe: false
});

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
