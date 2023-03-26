<template>
  <div class="article-detail-container">
    <h1>{{ data.title }}</h1>
    <ul class="info">
      <li class="date">
        <span>日期：</span><span>{{ data.createTime }}</span>
      </li>
      <li class="scan">
        <span>浏览：</span><span>{{ data.scanCount }}</span>
      </li>
      <li class="comment">
        <a href="#article-comment-list-container">
          <span>评论：</span>
          <span>{{ data.commentCount }}</span>
        </a>
        
      </li>
      <li class="cate">
        <RouterLink :to="{
            name:'ArticleCategory',
            params : {
                categoryId : data.category.id
            }
        }"> {{ data.category.name }}</RouterLink>
      </li>
    </ul>
    <div class="blog-content markdown-body"
         v-html="data.htmlContent">
    </div>
  </div>
</template>

<script>
import '@/style/article.less'
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>


<style scoped lang="less">
@import url('~@/style/varible.less');
.article-detail-container {
  .info {
    display: flex;
    li,
    a {
      margin-right: 10px;
      font-size: 12px;
      color: @gary;
    }
    a:hover {
      color: @warn;
    }
  }
}
</style>