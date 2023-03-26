<template>
  <div class="message-area-container">
    <FormData @submit="submit" />
    <CommentList v-if="dataList"
                 :dataList="dataList"
                 :title="title"
                 :subTitle="subTitle
        " />
  </div>
</template>

<script>
import FormData from './FormData.vue'
import CommentList from './CommentList.vue'
export default {
  props: {
    dataList: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: '评论',
    },
    subTitle: {
      type: Number,
      default: 0,
    },
  },
  components: {
    FormData,
    CommentList,
  },
  methods: {
    submit(data, cb) {
      this.$emit('submit', data, cb)
    },
  },
}
</script>

<style>
</style>