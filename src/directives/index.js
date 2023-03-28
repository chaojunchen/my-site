import Vue from "vue"
import vLoading from "./loading.js"
import lazy from "./lazy.js"
Vue.directive('loading', vLoading)
Vue.directive("lazy", lazy)
