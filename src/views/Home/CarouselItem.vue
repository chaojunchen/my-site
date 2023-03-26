<template>
  <div class="animation-container"
       ref="container"
       @mouseleave="toCenter">
    <div class="imgsWrap"
         ref="imgsWrap"
         :style="{
            left:-disLeft + 'px',
            top:-disTop + 'px',
            transition : hasTransition ? '.2s linear' : '',

         }">
      <ImageLoader :main="data.bigImg"
                   :mask="data.midImg"
                   @finish="loadFinish" />
    </div>
    <div class="desc"
         :style="{
            color : `rgb(${data.color})`
        }">
      <p class="title"
         ref="title">{{ data.title }}</p>
      <p class="text"
         ref="text">{{ data.description }}</p>
    </div>
  </div>
</template>

<script>
import { throttle } from '@/utils/index.js'
import ImageLoader from '@/components/ImageLoader.vue'
export default {
  data() {
    return {
      hasTransition: false, //是否需要过渡，比如图片刚加载居中时不需要。
      throttleFn: null, //节流函数，记录是为了添加和移除监听。
      extraWidth: 0, //背景盒子多出的部分
      extraHeight: 0,
      containerWidth: 0, //最前面盒子的大小
      containerHeight: 0,
      disLeft: 0, //距离左边的数值，会做用到position上
      disTop: 0, //距离顶部数值

      titileWidth: 0, //标题文字宽度
      textWidth: 0, //描述宽度。
    }
  },
  props: {
    data: {
      type: Object,
    },
  },
  components: { ImageLoader },
  methods: {
    // 得到相关dom元素的大小尺寸。
    getSize() {
      const refs = this.$refs
      // 最外层元素
      const containerRect = refs.container.getBoundingClientRect()

      this.containerWidth = containerRect.width
      this.containerHeight = containerRect.height

      //   内部元素
      const extraDomRect = refs.imgsWrap.getBoundingClientRect()
      //   大的减去小的宽高得到多余部分。
      this.extraWidth = extraDomRect.width - this.containerWidth
      this.extraHeight = extraDomRect.height - this.containerHeight

      //标题，文字相关元素。

      const title = refs.title
      const text = refs.text

      this.titileWidth = title.getBoundingClientRect().width
      this.textWidth = text.getBoundingClientRect().width

      //   宽度设为0，后面改为保存的宽度，以此来添加动画效果。
      title.style.width = 0
      text.style.width = 0
    },

    //添加鼠标移动事件监听。
    addMoveListener() {
      const tempFn = throttle(90, (event) => {
        const left = (event.offsetX / this.containerWidth) * this.extraWidth
        const top = (event.offsetY / this.containerHeight) * this.extraHeight
        this.disLeft = left
        this.disTop = top
      })
      this.throttleFn = tempFn
      this.$refs.container.addEventListener('mousemove', this.throttleFn)
    },
    // 移除事件监听
    removeListener() {
      this.$refs.container.removeEventListener('mousemove', this.throttleFn)
      this.$refs.container.removeEventListener('mouseleave', this.toCenter)
    },

    /**
     * @param {*} hasTransition 居中的过程是否需要动画。
     */
    toCenter(hasTransition) {
      if (!hasTransition) {
        this.$refs.container.transition = ''
      }
      this.disLeft = this.extraWidth / 2
      this.disTop = this.extraHeight / 2
    },

    // 鼠标移除了
    dealLeave() {
      this.$refs.container.addEventListener('mouseleave', this.toCenter)
    },
    // 图片加载、动画结束了。
    loadFinish() {
      this.hasTransition = true
      this.addMoveListener()
      const ref = this.$refs

      //   显示文字并添加动画
      ref.title.style.transition = '3s  all'
      ref.text.style.transition = '3s  all 2s'

      ref.title.style.width = this.titileWidth + 'px'
      ref.text.style.width = this.textWidth + 'px'
    },
  },

  mounted() {
    this.getSize()
    this.toCenter()
  },

  beforeDestroy() {
    this.removeListener()
  },
}
</script>

<style lang="less" scoped>
.animation-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .imgsWrap {
    width: 120%;
    height: 120%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .desc {
    position: absolute;
    top: 65%;
    left: 5%;
    p {
      white-space: nowrap;
      overflow: hidden;
    }
    p.title {
      font-size: 35px;
      font-weight: 400;
      letter-spacing: 5px;
    }
    p.text {
      margin-top: 10px;
      font-size: 20px;
      letter-spacing: 10px;
    }
  }
}
</style>