<template>
  <div class="comment-list-container">
    <div class="title">
      <h3>{{ title }}</h3>
      <span>( {{ subTitle }} )</span>
    </div>
    <ul class="list">
      <li v-for="item in dataList"
          :key="item.id">
        <div class="avatar">
          <Avatar :src="item.avatar"
                  :size="50" />
        </div>
        <div class="info">
          <div class="name-date">
            <span class="name">{{ item.nickName }}</span>
            <span class="date">{{ item.createTime }}</span>
          </div>
          <p class="comment">
            {{ item.content }}
          </p>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
export default {
  components: { Avatar },
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
}
</script>

<style scoped lang="less">
@import url('~@/style/varible.less');
.comment-list-container {
  .title {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
      font-weight: bold;
    }
  }
  ul.list {
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      padding: 15px;
      box-sizing: border-box;
      color: #424242;
      border-bottom: 1px solid lighten(@gary, 10%);
      line-height: 1.5em;
      .avatar {
        margin-right: 15px;
      }
      .info {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        .name-date {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .name {
            color: @success;
            font-weight: bold;
          }
          .date {
            color: @gary;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>