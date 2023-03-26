<template>
  <div class="imageLoader-container">
    <img :src="main"
         class="mainImg"
         @load="mainImgIsLoading=false"
         @transitionend="finish"
         :style="{
            opacity : mainImgIsLoading  ? 0 : 1,
            transition : `${duration}ms linear all .3s`
         }">

    <img v-if="maskImgIsVisible"
         class="maskImg"
         :src="mask"
         :style="{
            opacity : mainImgIsLoading  ? 1 : 0,
            transition : `${duration}ms linear `
         }">
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainImgIsLoading: true, //主要图片是否在加载中。
      maskImgIsVisible: true, //是否让遮罩层消失
    }
  },
  props: {
    // 主要的图片
    main: {
      type: String,
      required: true,
    },
    // 遮罩的图片
    mask: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  methods: {
    finish() {
      this.maskImgIsVisible = false
      this.$emit('finish')
    },
  },
}
</script>

<style scoped lang="less">
.imageLoader-container {
  width: 100%;
  height: 100%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
    &.maskImg {
      z-index: 1;
    }
  }
}
</style>