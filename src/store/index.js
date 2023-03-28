import Vuex from "vuex"
import Vue from 'vue'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        number: 0,
    },
    mutations: {
        increase () {
            this.state.number++;
        },
        decrease () {
            this.state.number--;
        },
        change (pay) {
            this.state.number = pay;
        }
    },
    action: {
        asyncIncrease (ctx) {
            setTimeout(() => {
                ctx.commit('increase')
            }, 1000)
        },
        asyncDecrese (ctx) {
            setTimeout(() => {
                ctx.commit('decrease')
            }, 1000)
        },
        asyncChange (ctx, num) {
            setTimeout(() => {
                ctx.commit()
            }, 1000)
        },
    },
})

export default store;