<template>
  <!-- Pin to top right corner -->
  <div class="absolute top-0 right-0 h-12 w-18 p-4">
    <span
      class="outline-none cursor-pointer"
      v-on:click="toggleNightMode"
    >{{nightMode ? "☀️" : "🌙" }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    nightMode() {
      return this.$store.state.nightMode;
    }
  },
  methods: {
    toggleNightMode: function() {
      this.$store.commit("toggleNightMode");
    }
  }
};
</script>