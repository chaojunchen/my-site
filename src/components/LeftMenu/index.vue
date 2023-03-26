<template>
  <ul class="menu-container">
    <li class="avatar">
      <Avatar :URL="'https://img0.baidu.com/it/u=1540857586,2240473015&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'"
              :size="150" />
      <p>熊二大战哥斯拉</p>
    </li>
    <li class="nav">
      <Navigate />
    </li>
    <li class="contact">
      <Concact />
    </li>
    <li class="footer">浙公网安备 33011002011859</li>
  </ul>
</template>

<script>
import Avatar from '../Avatar.vue'
import Concact from './Contact.vue'
import Navigate from './Navigate.vue'
export default {
  components: {
    Avatar,
    Concact,
    Navigate,
  },
}
</script>

<style scoped lang="less">
@import url('~@/style/varible.less');
.menu-container {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  .avatar {
    display: flex;
    align-items: center;
    flex-direction: column;
    p {
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      margin: 0px;
      padding-top: 10px;
    }
  }
  .nav {
    margin-top: 30px;
    margin-bottom: 40px;
  }
  .footer {
    color: darken(@gary, 50%);
    font-size: 12px;
    text-align: center;
    margin-top: 20px;
  }
}
</style>