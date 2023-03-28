<template>
  <div id="app">
    <div>
      <aVue />
    </div>
    <div>
      <bVue />
    </div>

    <button @click="increase">增加</button>
    <button @click="decrease">减少</button>

    <!-- <Layout>
      <template #left>
        <div class="left">
          <LeftMenu />
        </div>
      </template>

      <template #main>
        <div class="main">
          <RouterView />
        </div>
      </template>
    </Layout>
    <ToTop /> -->
  </div>
</template>

<script>
import Layout from './components/Layout.vue'
import LeftMenu from './components/LeftMenu/index.vue'
import ToTop from './components/ToTop.vue'
import aVue from './a.vue'
import bVue from './b.vue'

export default {
  data() {
    return {
      list: [],
    }
  },
  components: {
    ToTop,
    Layout,
    LeftMenu,
    aVue,
    bVue,
  },
  methods: {
    increase() {
      this.$store.dispatch('asyncIncrease')
    },
    decrease() {
      this.$store.dispatch('asyncDecrease')
    },

  },

}
</script>

<style scoped lang="less">
#app {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  //   display: flex;

  .left {
    width: 250px;
    height: 100%;
    background: #000;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .main {
    height: 100%;
  }
}
</style>