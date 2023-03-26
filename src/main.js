import Vue from 'vue'
import App from './App.vue'
import "./style/reset.less"
import router from './router/index.js'


// 添加自定义指令
import "./directives/index.js"
import { dialog, eventBus } from "./utils/index.js"
Vue.prototype.$dialog = dialog;

Vue.prototype.$bus = eventBus;

// mock拦截。
import "./mock/index.js"


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')