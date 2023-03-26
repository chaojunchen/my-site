<template>
  <div class="article-comment-list-container"
       id="article-comment-list-container">
    <MessageArea v-if="data"
                 :dataList="data.rows"
                 :subTitle="data.total"
                 @submit="submitComment" />

    <div class="loading-more-comment"
         v-loading="isLoading"
         v-if="data"
         ref="moreCommentArea">
      <span v-if="hasMoreComment">已经到底了！</span>
    </div>
  </div>
</template>

<script>
import { getComment, postComment } from '@/api/article'
import fetchData from '@/mixin/fetchData'
import MessageArea from '@/components/MessageArea/'
export default {
  mixins: [fetchData(null)],
  data() {
    return {}
  },
  computed: {
    articleID() {
      return +this.$route.params.articleId
    },
    // 是否还有更多评论
    hasMoreComment() {
      if (!this.data) return false

      return this.data.total === this.data.rows.length
    },
  },
  components: {
    MessageArea,
  },
  methods: {
    // 请求评论
    async fetchData() {
      return await getComment(this.articleID)
    },

    // 子组件抛出评论信息
    async submitComment(data, cb) {
      const result = await postComment({
        ...data,
        id: this.articleID,
      })
      this.data.total++
      this.data.rows.unshift({
        id: result.id,
        nickName: data.nickName,
        content: data.text,
        createTime: result.createTime,
        avatar: result.avatar,
      })
      this.$dialog({
        type: 'success',
        text: '评论成功！',
        callback: function () {
          cb()
        },
      })
    },

    // 请求更多评论
    async getMoreComment() {
      if (this.isLoading || this.hasMoreComment) return

      this.isLoading = true
      const { page: curPage = 1, limit = 10 } = this.$route.query

      //   新的评论
      const newComment = await getComment(this.articleID, curPage + 1, limit)

      //   新旧评论拼接
      const concat = [...this.data.rows, ...newComment.rows]

      // 大于了评论总数
      if (concat.length >= this.data.total) {
        this.data.rows = concat.splice(0, this.data.total)
      } else {
        this.data.rows = concat
      }
      this.isLoading = false
    },
    // 主区域滚动了，是否到底部，是否加载更多评论。
    loadMoreComment(mainDom) {
      if (!mainDom) return

      const commentArea = this.$refs.moreCommentArea
      if (!commentArea) return
      const top = commentArea.getBoundingClientRect().top
      const screenHeight = document.documentElement.clientHeight

      //   到底最底部了
      if (top - screenHeight <= 130) {
        this.getMoreComment()
      }
    },
  },

  created() {
    this.$bus.$on('mainScroll', this.loadMoreComment)
  },
  beforeDestroy() {
    this.$bus.$emit('mainScroll', null)
    this.$bus.$off('mainScroll', this.loadMoreComment)
  },
}
</script>


<style scoped lang="less">
@import url('~@/style/varible.less');
.article-comment-list-container {
  margin-top: 40px;
  .loading-more-comment {
    width: 100%;
    height: 60px;
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: @gary;
  }
}
</style>