<template>
  <div class="article-item-container">
    <div class="thumb"
         @click="toDetail(data.category.id)"
         v-if="data.thumb">
      <img v-lazy="data.thumb"
           alt="">
    </div>
    <div class="main">
      <h3 class="title"
          @click="toDetail(data.category.id)">{{ data.title }}</h3>
      <div class="info">
        <span class="date">日期：{{ data.createTime }}</span>
        <span class="scanNumber">浏览：{{ data.scanNumber }}</span>
        <span class="comment">评论：{{ data.commentNumber }}</span>
        <a class="cate">分类：<span @click="changeCategor(data.category.name)">{{ data.category.name }}</span></a>
      </div>
      <div class="desc">{{ data.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  methods: {
    changeCategor(newCate) {
      this.$emit('changeCategory', newCate)
    },
    toDetail(id) {
      this.$emit('toDetail', id)
    },
  },
}
</script>

<style scoped lang="less">
@import url('~@/style/varible.less');
.article-item-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
  padding: 25px;
  .thumb {
    width: 200px;
    height: 200px;
    flex: 0 0 auto;
    overflow: hidden;
    border-radius: 20px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .main {
    margin-left: 30px;
    flex: 1 1 auto;
    overflow: hidden;
    word-break: break-all;
    .title {
      font-size: 20px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .info {
      margin-bottom: 10px;
      span,
      a {
        font-size: 12px;
        color: @gary;
        margin-right: 20px;
      }
      .cate span {
        color: @warn;
        cursor: pointer;
      }
    }
    .desc {
      max-width: 500px;
      max-height: 200px;
      overflow: hidden;
    }
  }
}
</style>