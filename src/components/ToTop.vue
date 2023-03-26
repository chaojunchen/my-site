<template>
  <div class="to-top-container"
       @click="toTop"
       v-show="showToTop">
    Top
  </div>
</template>

<script>
export default {
  data() {
    return {
      showToTop: false,
    }
  },
  methods: {
    toTop() {
      this.$bus.$emit('toTop')
    },
  },
  created() {
    this.mainScrollEventFn = (tarDom) => {
      // 组件销毁时会传入一个假值
      if (!tarDom) {
        this.showToTop = false
        return
      }

      // 当主区域滚动距离大于500时显示toTop组件
      if (tarDom.scrollTop >= 200) {
        this.showToTop = true
        return
      }
      this.showToTop = false
    }
    // 监听主区域滚动事件。
    this.$bus.$on('mainScroll', this.mainScrollEventFn)
  },
}
</script>

<style scoped lang="less">
@import url('~@/style/varible.less');
.to-top-container {
  position: fixed;
  right: 50px;
  bottom: 50px;
  background: @success;
  padding: 15px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  color: #f0f0f0;
  &::selection {
    background: transparent;
  }
}
</style>