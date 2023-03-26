<template>
  <ul class="contact-container">
    <li>
      <a href="">
        <Icon :type="'QQ'" />
        <span class="hrefs">2779468840@qq.com &nbsp;{{  }}</span>
        <div class="img">
          <img :src="src"
               alt="">
          <span class="triangle"></span>
        </div>
      </a>
    </li>
    <li>
      <a href="">
        <Icon :type="'QQ'" />
        <span class="hrefs">2779468840@qq.com &nbsp;{{  }}</span>
        <div class="img">
          <img :src="src"
               alt="">
          <span class="triangle"></span>
        </div>
      </a>
    </li>
    <li>
      <a href="">
        <Icon :type="'QQ'" />
        <span class="hrefs">2779468840@qq.com &nbsp;{{  }}</span>
        <div class="img">
          <img :src="src"
               alt="">
          <span class="triangle"></span>
        </div>
      </a>
    </li>
    <li>
      <a href="">
        <Icon :type="'QQ'" />
        <span class="hrefs">2779468840@qq.com &nbsp;{{  }}</span>
        <div class="img">
          <img :src="src"
               alt="">
          <span class="triangle"></span>
        </div>
      </a>
    </li>
    <li>
      <a href="">
        <Icon :type="'QQ'" />
        <span class="hrefs">2779468840@qq.com &nbsp;{{  }}</span>
        <div class="img">
          <img :src="src"
               alt="">
          <span class="triangle"></span>
        </div>
      </a>
    </li>
    <li>
      <a href="">
        <Icon :type="'QQ'" />
        <span class="hrefs">2779468840@qq.com &nbsp;{{  }}</span>
        <div class="img">
          <img :src="src"
               alt="">
          <span class="triangle"></span>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
import Icon from '../Icon.vue'
import qq from '@/assets/qq.png'
export default {
  data() {
    return {
      src: qq,
    }
  },
  components: {
    Icon,
  },
}
</script>

<style scoped lang="less">
@import url('~@/style/varible.less');

.contact-container {
  width: 100%;
  height: 100%;
  background: transparent;
  li {
    width: 100%;
    height: 30px;
    position: relative;
    line-height: 30px;
    margin: 10px 0;
    &:hover {
      a {
        color: @primary;
      }
      div.img {
        transform: scaley(1);
      }
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      color: @gary;
      font-size: 14px;
      .icon-container {
        font-size: 30px;
      }
      span.hrefs {
        vertical-align: top;
        padding-left: 5px;
      }
      div.img {
        position: absolute;
        width: 150px;
        height: 150px;
        background: #fff;
        left: 15%;
        top: -160px;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 11px;
        transform-origin: bottom;
        transition: 0.5s;
        transform: scaleY(0);
        &::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          background: #fff;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%) rotateZ(45deg);
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>