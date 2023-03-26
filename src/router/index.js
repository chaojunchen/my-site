
import Vue from "vue"
import Router from "vue-router"
import routes from "./routes.js"

const router = new Router({
    mode:'history',
    routes
})

Vue.use(Router);
export default router