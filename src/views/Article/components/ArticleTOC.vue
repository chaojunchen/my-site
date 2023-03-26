<template>
  <div class="article-toc-container">
    <RightCategory :data="newToc"
                   @anchorTo="anchorTo" />
  </div>
</template>

<script>
import RightCategory from './RightCategory.vue'

export default {
  data() {
    return {
      activeAnchor: 'anchor-title-1',
    }
  },
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
  components: {
    RightCategory,
  },
  computed: {
    // 克隆一个新的toc目录，并添加一个isSelected属性。
    newToc() {
      const _this = this
      const clone = function (toc = []) {
        return toc.map((item) => {
          return {
            ...item,
            isSelected: _this.activeAnchor === item.anchor,
            children: clone(item.children),
          }
        })
      }
      return clone(this.toc)
    },
  },

  methods: {
    // 点击了目录，抛出事件。
    anchorTo(newAnc) {
      this.$emit('anchorTo', newAnc)
    },

    // 根据事件总线改变当前选中的目录。
    setSelecte(dom) {
      if (!dom) return
      const doms = this.getDoms(this.toc)

      for (let i = 0; i < doms.length; i++) {
        const item = doms[i]
        const top = item.getBoundingClientRect().top
        if (top <= 200) {
          this.activeAnchor = item.id
        }
      }
    },

    // 获取页面中的标题元素。
    getDoms(toc) {
      const doms = []
      toc.forEach((item) => {
        doms.push(document.getElementById(item.anchor))
        if (item.children && item.children.length) {
          getTocDom(item.children)
        }
      })

      return doms
    },
  },
  created() {
    this.$bus.$on('mainScroll', this.setSelecte)
  },
  beforeDestroy(){
    this.$bus.$off("mainScroll",this.setSelecte);
  }
}
</script>

<style scoped lang="less">
@import url('~@/style/varible.less');
.article-toc-container {
  width: 100%;
  height: 100%;
}
</style>