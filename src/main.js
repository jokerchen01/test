import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control

import '@/assets/scss/common.scss'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

import BaiduMap from 'vue-baidu-map'

Vue.use( BaiduMap, { ak : 'bcgFyx246CQiXlk1FAbh9aQ46d2SCoCn' } )

import moment from "moment";
Vue.prototype.$moment = moment;

import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
import api from "@/api";
Vue.prototype.$api = api;
new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
