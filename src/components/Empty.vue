<template>
  <div class="empty-container">
    <Icon :type="'empty'"
          :style="{
            fontSize : size + 'px'
           
          }" />
    <p>{{ text }}</p>
  </div>

</template>

<script>
import Icon from './Icon.vue'
export default {
  components: {
    Icon,
  },

  props: {
    size: {
      type: Number,
      default: 200,
    },
    text: {
      type: String,
      default: '数据为空',
    },
  },
}
</script>

<style  lang="less" scoped>
@import url('~@/style/varible.less');
.empty-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .icon-container {
    font-size: 200px;
    color: @gary;
  }
  p {
    color: @gary;
  }
}
</style>