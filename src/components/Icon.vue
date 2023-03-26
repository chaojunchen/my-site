<template>
  <span class="iconfont icon-container"
        :class="realType"></span>
</template>

<script>
const typeList = {
  home: 'icon-home1',
  QQ: 'icon-QQ',
  weixin: 'icon-weixin',
  arrowLeft: 'icon-arrowleft',
  arrowRight: 'icon-arrowright',
  arrowUp: 'icon-jiantou_yemian_xiangshang_o',
  arrowDown: 'icon-jiantou_yemian_xiangxia_o',
  message: 'icon-liuyan1',
  github: 'icon-github-fill',
  empty: 'icon-empty',
  mail: 'icon-youxiang1',
  article: 'icon-newstextarticle',
  about: 'icon-about',
  project: 'icon-code',
  error: 'icon-error',
  warning: 'icon-warning',
  success: 'icon-success',
  danger: 'icon-Danger',
}
export default {
  props: {
    type: {
      type: String,
      default: 'icon-home;',
    },
  },
  computed: {
    realType() {
      return typeList[this.type]
    },
  },
}
</script>

<style scoped>
/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@import url('//at.alicdn.com/t/c/font_3933595_bv0n5jgmz77.css');
.icon-container {
  background: transparent;
}
</style>