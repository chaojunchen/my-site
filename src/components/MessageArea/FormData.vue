<template>
  <div class="form-data"
       @submit.prevent="submit">
    <form action="">
      <!-- 昵称 -->
      <div class="nick-name">
        <div class="input">
          <input type="text"
                 v-model.trim="nickName"
                 :maxlength="nickNameMaxLen">
          <span class="tip">{{curNickLen}}</span>
        </div>
        <div class="error">
          <p v-show="!nickName">请输入昵称</p>
        </div>
      </div>
      <!-- 评论 -->
      <div class="comment">
        <div class="input">
          <textarea name=""
                    v-model.trim="comment"
                    id=""
                    cols="30"
                    :maxlength="commentMaxLen"
                    rows="10"></textarea>
          <span class="tip">{{ curCommentLen }}</span>
        </div>
        <div class="error">
          <p v-show="!comment">请输入评论</p>
        </div>
      </div>

      <!-- 提交 -->
      <div class="btn">
        <button @click.prevent="submit"
                :disabled="disabled">提交</button>
      </div>

    </form>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      disabled: false, //
      nickName: '',
      nickNameMaxLen: 10,
      comment: '',
      commentMaxLen: 300,
    }
  },
  computed: {
    curNickLen() {
      return this.nickName.length + '/' + this.nickNameMaxLen
    },
    curCommentLen() {
      return this.comment.length + '/' + this.commentMaxLen
    },
  },
  methods: {
    submit() {
      if (!this.nickName || !this.comment) {
        return
      }
      this.disabled = true

      this.$emit(
        'submit',
        {
          nickName: this.nickName,
          text: this.comment,
        },
        () => {
          this.disabled = false
          //   this.nickName = ''
          //   this.comment = ''
        }
      )
    },
  },
}
</script>
  
  <style scoped lang="less">
@import url('~@/style/varible.less');
.form-data {
  .nick-name,
  .comment {
    .input {
      position: relative;
      input,
      textarea {
        width: 100%;
        outline: none;
        border: 1px dashed @primary;
        resize: none;
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 14px;
        color: #424242;
        margin-top: 15px;
        &:focus {
          box-shadow: 0px 0px 1px 1px lighten(@primary, 25%) inset;
        }
      }
      .tip {
        position: absolute;
        right: 5px;
        bottom: 5px;
        font-size: 12px;
        color: @gary;
      }
    }

    &.nick-name {
      .input {
        width: 50%;
      }
    }
    &.comment {
      .input {
        width: 100%;
      }
    }
    .error {
      font-size: 14px;
      margin-top: 5px;
      height: 1.5em;
      color: @warn;
    }
  }

  .btn {
    margin: 10px 0;
    button {
      outline: none;
      border: none;
      padding: 10px 25px;
      border-radius: 5px;
      background: @primary;
      color: #ecebeb;
      cursor: pointer;
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
}
</style>