import "./_global";

import Snap from "snapsvg";

import Vue from "vue";
import VueScrollTo from "vue-scrollto";
import VueMask from "v-mask";
import VueLazyLoad from "vue-lazyload";

import { gsap, scrollMagic } from "./plugins/index";
import store from "./store";
import router from "./router";

import App from "./App.vue";

import "swiper/dist/css/swiper.css";
import "./scss/app.scss";

Vue.use(VueScrollTo, {
  cancelable: false
});
Vue.use(VueMask);
Vue.use(VueLazyLoad);

Vue.use(gsap);
Vue.use(scrollMagic);

new Vue({
  store,
  router,
  el: "#app",
  created() {
    store.dispatch("getData", true, );
  },
  render: h => h(App)
});
