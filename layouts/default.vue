<template>
  <div
    :class="nightMode ? 'text-gray-300 bg-gray-900' : 'bg-gray-100 text-gray-700'"
    class="font-sans quicksand min-h-screen"
  >
    <nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    nightMode() {
      return this.$store.state.nightMode;
    }
  }
};
</script>

<style>
</style>
