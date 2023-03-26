<template>
  <ul class="pager-container">
    <!-- 上一页按钮 -->
    <li class="prev"
        @click="change(currentPage-1)"
        v-show="disabledPrev">
      <Icon :type="'arrowLeft'" />上一页
    </li>

    <!-- 中间页码 -->
    <li @click="change(1)"
        v-show="disabledPrev">首页</li>
    <li v-for="i in pageList"
        :key="i"
        :class="{active : currentPage === i}"
        @click="change(i)">
      {{ i }}

    </li>
    <li @click="change(maxPage)"
        v-show="disabledNext
        ">最后一页</li>
    <!-- 下一页按钮 -->
    <li class="next"
        @click="change(currentPage+1)"
        v-show="disabledNext">
      下一页
      <Icon :type="'arrowRight'" />
    </li>
  </ul>

</template>

<script>
import Icon from './Icon.vue'
export default {
  components: { Icon },
  props: {
    // 当前页
    currentPage: {
      type: Number,
      default: 1,
    },
    // 总的数据条数
    totalData: {
      type: Number,
      default: 108,
    },

    // 显示可见de页数
    visiblePage: {
      type: Number,
      default: 9,
    },

    // 每一页多少条数据
    limit: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    // 最多一共多少也。
    maxPage() {
      return Math.ceil(this.totalData / this.limit)
    },

    // 页码起始页
    startPage() {
      const center = Math.floor(this.visiblePage / 2)
      let min = this.currentPage - center
      min <= 0 && (min = 1)
      return min
    },

    // 结尾页码。
    endPage() {
      let max = this.startPage + this.visiblePage - 1
      max >= this.maxPage && (max = this.maxPage)
      return max
    },

    // 根据以上计算属性计算出应该显示的页码
    pageList() {
      const arr = []
      for (let i = this.startPage; i <= this.endPage; i++) {
        arr.push(i)
      }
      return arr
    },
    // 是否禁用上一页、首页
    disabledPrev() {
      return this.currentPage !== 1
    },
    // 是否禁用下一页、最后一页
    disabledNext() {
      return this.currentPage !== this.maxPage
    },
  },
  methods: {
    change(newPage) {
      if (this.currentPage === newPage) return
      this.$emit('pageChange', newPage)
    },
  },
}
</script>

<style scoped lang="less">
@import url('~@/style/varible.less');
.pager-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  background: @white;
  font-size: 14px;
  li {
    flex: 0 0 auto;
    min-width: 20px;
    text-align: center;
    margin: 0 5px;
    color: @primary;
    cursor: pointer;
    padding: 4px 5px;
    border-radius: 5px;
    &:hover,
    &.active {
      background: @primary;
      color: @white;
    }
  }
}
</style>
