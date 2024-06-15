<template>
  <div class="bg-image"></div>
</template>

<script>
export default {
  name: 'BgImageComponent',
  props: {
    imageUrl: {
      type: String,
      default: 'funaebg.png'
    },
    opacity: {
      type: Number,
      default: 0.1
    }
  }
}
</script>

<style scoped>
.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.5;
  background-image: url('funaebg.png'); /* Default background image */
}

/* Apply dynamic styles */

</style>
