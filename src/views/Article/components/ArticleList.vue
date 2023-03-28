<template>

  <ul class="article-list-container"
      ref="wrap"
      v-loading="isLoading">

    <li v-for="(item) in data.rows"
        :key="item.id">
      <ArticleItem :data="item"
                   @toDetail="toDetail"
                   @changeCategory="changeCategory" />
    </li>
    <li class="pager"
        v-if="data.rows
    ">
      <Pager :currentPage="routeInfo.page"
             :limit="routeInfo.limit"
             :totalData="totalData"
             :visiblePage="visiblePage"
             @pageChange="dealPageChange" />
    </li>
  </ul>

</template>

<script>
import fetchData from '../../../mixin/fetchData'
import mainScrollToBus from '../../../mixin/mainScrollToBus'

import { getArticleList } from '@/api/article.js'
import ArticleItem from './ArticleItem.vue'
import Pager from '@/components/Pager.vue'
 export default {
  data() {
    return {
      visiblePage: 10, //分页组件可见页码
      totalData: 0, //数据总量。
    }
  },
  mixins: [fetchData([]), mainScrollToBus('wrap')],
  components: { ArticleItem, Pager },
  computed: {
    routeInfo() {
      const { params, query } = this.$route
      const { categoryId = -1 } = params
      const { page = 1, limit = 10 } = query
      return {
        categoryId: categoryId,
        page: +page,
        limit: +limit,
      }
    },
  },
  methods: {
    async fetchData() {
      const { limit, categoryId, page } = this.routeInfo
      const result = await getArticleList({
        limit,
        categoryId,
        page,
        total: this.totalData,
      })

      this.totalData = result.total
      this.data = {}
      return result
    },
    // 页码改变，请求新的一页。
    dealPageChange(newPage) {
      const { categoryId, limit = 10 } = this.routeInfo
      const query = {
        limit,
        page: newPage,
      }
      if (this.routeInfo.categoryId === -1) {
        this.$router.push({
          name: 'Article',
          params: {
            categoryId,
          },
          query,
        })
      } else {
        this.$router.push({
          name: 'ArticleCategory',
          params: {
            categoryId,
          },
          query,
        })
      }
    },

    // 分类改变了
    changeCategory(newId) {
      const { categoryId } = this.$route.params
      if (categoryId === newId) return
      const { page, limit } = this.$route.query
      this.$router.push({
        name: 'ArticleCategory',
        params: {
          categoryId: newId,
        },
        query: {
          page,
          limit,
        },
      })
    },
    // 请求文章详情
    toDetail(id) {
      this.$router.push({
        name: 'ArticleDetail',
        params: {
          articleId: id,
        },
      })
    },
  },
  watch: {
    $route: async function () {
      this.$refs.wrap.scrollTop = 0
      this.isLoading = true
      this.data = await this.fetchData()
      this.isLoading = false
    },
  },
}
</script>

<style scoped lang="less">
@import url('~@/style/varible.less');
.article-list-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;

  li {
    width: 100%;
    height: 250px;
    overflow: hidden;
    border-bottom: 1px solid @gary;
    &.pager {
      height: auto;
      margin-top: 50px;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>