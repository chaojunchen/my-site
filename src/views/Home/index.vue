<template>
  <div class="home-container"
       v-loading="isLoading">
    <ul class="wrap"
        ref="wrap"
        :style="{
            marginTop : -currentPage * wrapHeight + 'px'
        }">

      <!-- 循环生成图片 -->
      <li v-for="(item,i) in data"
          :key="i">
        <CarouselItem :data="item" />
      </li>
    </ul>
    <!-- 索引小点 -->
    <div class="points">
      <span v-for="i in data.length"
            :key="i"
            @click="changePage(i-1)"
            :class="{
                active:(i-1)===currentPage
              }">
      </span>
    </div>

    <!-- 上一张、下一张的切换 -->
    <div class="prev"
         @click="changePage(currentPage-1)">
      <Icon :type="'arrowUp'" />
    </div>
    <div class="next"
         @click="changePage(currentPage+1)">
      <Icon :type="'arrowDown'" />
    </div>
    <!-- 加载中组件 -->
  </div>
</template>

<script>
import { default as getData } from '@/api/banner.js'
import CarouselItem from './CarouselItem.vue'

import Icon from '@/components/Icon.vue'
import fetchData from '../../mixin/fetchData.js'

export default {
  data() {
    return {
      wrapHeight: 0, //整个容器高度，用于轮播图
      currentPage: 0,
    }
  },
  mixins: [fetchData([])],
  components: { CarouselItem, Icon },
  methods: {
    async fetchData() {
      return await getData()
    },
    // 页码改变；
    changePage(newPage) {
      if (newPage < 0) return
      if (newPage > this.data.length - 1) return
      this.currentPage = newPage
    },
    // 获取容器高度
    getSize() {
      this.wrapHeight = this.$refs.wrap.clientHeight
    },
  },
  mounted() {
    this.getSize()
    window.addEventListener('resize', this.getSize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getSize)
  },
}
</script>

<style scoped lang="less">
@keyframes arrowUp {
  0% {
    transform: translatey(-10px);
  }

  100% {
    transform: translatey(10px);
  }
}
@keyframes arrowDown {
  0% {
    transform: translatey(10px);
  }

  100% {
    transform: translatey(-10px);
  }
}
@import url('~@/style/varible.less');
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .wrap {
    width: 100%;
    height: 100%;
    transition: 0.5s;
    li:not(.points) {
      width: 100%;
      height: 100%;
    }
  }
  .points {
    position: absolute;
    color: #f00;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    margin-right: 10px;

    span {
      display: block;
      width: 10px;
      height: 10px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0px 0px 5px 1px #000;
      cursor: pointer;
      margin: 5px;
      &.active {
        background: @primary;
        box-shadow: 0px 0px 2px 1px @success;
      }
    }
  }
  .prev,
  .next {
    position: absolute;
    left: 50%;
    transform: translateX(-50);
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    .icon-container {
      font-size: 50px;
      color: #fff;
      cursor: pointer;
    }

    &.prev {
      top: 50px;
      animation-name: arrowUp;
    }
    &.next {
      bottom: 50px;
      animation-name: arrowDown;
    }
  }
}
</style>