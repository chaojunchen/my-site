<template>
  <div class="detail-container"
       v-loading="isLoading">
    <Layout>

      <!-- 中间区域 -->
      <template #main>
        <div class="main"
             ref="mainArea">
          <!-- 文章详情 -->
          <ArticleDetail :data="data"
                         v-if="data" />

          <!-- 评论 区域-->
          <ArticleCommentList v-if="data" />

        </div>
      </template>

      <!-- 右侧区域 -->
      <template #right>
        <div class="right">
          <!-- 文章目录 -->
          <ArticleTOC :toc="data.toc"
                      v-if="data"
                      @anchorTo="anchorTo" />
        </div>

      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout.vue'
import ArticleDetail from './components/ArticleDetailItem.vue'
import ArticleTOC from './components/ArticleTOC.vue'
import fetchData from '@/mixin/fetchData.js'
import mainScrollToBus from '@/mixin/mainScrollToBus.js'

import { getArticleDetail } from '@/api/article.js'
import ArticleCommentList from './components/ArticleCommentList.vue'
import { debounce } from '@/utils/index.js'

export default {
  data() {
    return {
      isLoadingMoreComment: false,
      hasMoreComment: true, //是否还有更多评论，
    }
  },
  mixins: [fetchData(), mainScrollToBus('mainArea')],
  components: {
    ArticleDetail,
    Layout,
    ArticleTOC,
    ArticleCommentList,
  },
  methods: {
    async fetchData() {
      return await getArticleDetail(12)
    },
    anchorTo(newAnchor) {
      location.hash = newAnchor.anchor
    },
  },

  updated() {
    const hash = location.hash
    location.hash = ''
    setTimeout(() => {
      location.hash = hash
    }, 100)
  },
}
</script>

<style lang="less" scoped>
@import url('~@/style/varible.less');
.detail-container {
  &,
  .main,
  .right {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .main,
  .right {
    overflow-y: auto;
    box-sizing: border-box;
    padding: 15px;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .right {
    width: 220px;
  }
}
</style>