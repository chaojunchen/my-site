<template>
  <div class="category-list-container"
       v-loading="isLoading">
    <div class="content">
      <Category :data="newDataList"
                @anchorTo="categoryChange" />
    </div>
  </div>
</template>

<script>
import Category from './RightCategory.vue'
import { getArticleCate } from '@/api/article'
import fetchData from '../../../mixin/fetchData'
export default {
  mixins: [fetchData([])],
  components: { Category },
  computed: {
    // 当前选中的分类
    nowCate: function () {
      return this.$route.params.categoryId || -1
    },

    // 全部文章总数。
    articleCount: function () {
      if (this.data.length) {
        return this.data.reduce((pre, item) => {
          return (pre += item.articleCount)
        }, 0)
      }
      return 0
    },

    // 映射当前数据，添加自定义属性。
    newDataList() {
      // 添加一个全部文章选项。
      const newData = [
        {
          name: '全部',
          id: -1,
          articleCount: this.articleCount,
        },
        ...this.data,
      ]

      //   添加一个属性看当前是否选中该分类。
      return newData.map((item) => {
        return {
          ...item,
          isSelected: parseInt(item.id) === parseInt(this.nowCate),
        }
      })
    },
  },
  methods: {
    // 获取数据。
    async fetchData() {
      return await getArticleCate({
        categoryId: this.nowCate,
      })
    },
    // 分类改变了。
    categoryChange(newCateObj) {
      /*
      思路：
      先通过$router.push改变路由信息，
      路由改变了会被文章列表组件的watch监听到，
      然后会请求当前分类的文章。
     */
      const { id: categoryId } = newCateObj

      //   目标id与当前id相等。
      if (categoryId === this.nowCate) return

      //   改变参数，当分类改变了， 那么一定是从该分类的第一页开始请求的。
      const query = {
        ...this.$route.query,
        page: 1,
      }
      const params = {
        categoryId,
      }
      // 加载所有文章。
      if (categoryId === -1) {
        this.$router.push({
          name: 'Article',
          params,
          query,
        })
      } else {
        // 指定类型文章
        this.$router.push({
          name: 'ArticleCategory',
          params,
          query,
        })
      }
    },
  },
}
</script>

<style scoped lang="less">
.category-list-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;

  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>