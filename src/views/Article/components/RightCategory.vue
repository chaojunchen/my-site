<template>
  <ul class="right-category-container">
    <li class="title">
      <h3>{{ title }}</h3>
    </li>
    <li v-for="(item,i) in data"
        :key="i"
        :class="{
            active:item.isSelected
        }"
        @click.stop="changeCategory(item)">
      <span class="name">{{ item.name }}</span>
      <span class="count"
            v-if="item.articleCount">{{ item.articleCount }}篇</span>

      <RightAnchor v-if="item.children && item.children.length"
                     :data="item.children"
                     @anchorTo="changeCategory" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RightAnchor',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '文章分类',
    },
  },
  methods: {
    changeCategory(newCate) {
      this.$emit('anchorTo', newCate)
    },
  },
}
</script>

<style scoped lang="less">
@import url('~@/style/varible.less');
.right-category-container {
  li {
    cursor: pointer;
    min-height: 30px;
    line-height: 30px;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &:hover span.name {
      color: @warn;
    }
    &.title {
      cursor: default;
    }

    &.active span {
      color: @warn;
    }
    span.count {
      margin-left: 10px;
      color: @gary;
      font-size: 12px;
    }
  }
  .right-category-container {
    margin-left: 1em;
  }
}
</style>