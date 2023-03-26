<template>
  <ul class="navigate-container">
    <li class=""
        v-for="(item,i) in urls"
        :key="i">
      <RouterLink :to="{
        name:item.to
      }"
                  :exact="item.exact
                ">
        <Icon :type="item.type" />
        <span class="text">{{item.name}}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<script>
import Icon from '../Icon.vue'
export default {
  data() {
    return {
      urls: [
        {
          link: '/',
          name: '首页',
          type: 'home',
          exact: true,
          to: 'Home',
        },
        {
          link: '/article',
          name: '文章',
          type: 'article',
          exact: false,
          to: 'Article',
        },
        {
          link: '/about',
          name: '关于我',
          type: 'about',
          to: 'About',
          exact: true,
        },
        {
          link: '/project',
          name: '项目&效果',
          type: 'project',
          exact: true,
          to: 'Project',
        },
        {
          link: '/message',
          name: '留言',
          type: 'message',
          exact: true,
          to: 'Message',
        },
      ],
    }
  },
  components: {
    Icon,
  },
}
</script>


<style scoped lang="less">
@import url('~@/style/varible.less');
.navigate-container {
  width: 100%;
  height: 100%;
  li {
    height: 45px;
    line-height: 45px;

    a.router-link-active {
      background: darken(@gary, 50%);
    }
    &:hover {
      a {
        color: @primary;
      }
    }
    a {
      padding-left: 50px;
      display: block;
      width: 100%;
      height: 45px;
      color: @gary;
      span.icon-container {
        font-size: 20px;
        margin-right: 5px;
      }
    }
  }
}
</style>