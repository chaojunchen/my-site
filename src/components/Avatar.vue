<template>
  <img class="avatar-container"
       :src="URL"
       alt=""
       :style="{
            width : size + 'px',
            height : size + 'px'
    }">
</template>

<script>
export default {
  props: {
    URL: {
      type: String,
    },
    size: {
      type: Number,
      default: 80,
    },
  },
}
</script>

<style scoped>
.avatar-container {
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>