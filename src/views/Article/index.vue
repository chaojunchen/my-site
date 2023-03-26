<template>
  <div class="article-container">
    <Layout>
      <template #main>
        <div class="blog-list">
          <ArticleList />
        </div>
      </template>
      <template #right>
        <div class="right-cate">
          <CategoryList />
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import CategoryList from './components/CategoryList'
import ArticleList from './components/ArticleList'
import Layout from '@/components/Layout.vue'

export default {
  components: {
    CategoryList,
    ArticleList,
    Layout,
    Layout,
  },
}
</script>

<style scoped lang="less">
.article-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .blog-list {
    height: 100%;
    overflow: hidden;
  }
  .right-cate {
    width: 200px;
    height: 100%;
    overflow: hidden;
  }
}
</style>