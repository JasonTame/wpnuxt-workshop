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
.quicksand {
    font-family: 'Nunito', sans-serif;
}

::selection {
    background: #E9D8FD;
color:#202684;

    /* WebKit/Blink Browsers */
}

::-moz-selection {
    background: #E9D8FD;
color:#202684;
    /* Gecko Browsers */
}

a:not(.nav) {
    font-weight: bold;
    text-decoration: none;
    padding: 2px;
    background: linear-gradient(to right, #5A67D8, #5A67D8);
    background-repeat: repeat-x;
    background-size: 100% 2px;
    background-position: 0 95%;
    -webkit-transition: all 150ms ease-in-out;
    -moz-transition: all 150ms ease-in-out;
    -ms-transition: all 150ms ease-in-out;
    -o-transition: all 150ms ease-in-out;
    transition: all 150ms ease-in-out;
}

a:hover {
    color: #B794F4;
    font-weight: bold;
    text-decoration: none;
    padding-bottom: 2px;
    background: linear-gradient(to right, #9F7AEA, #E9D8FD);
    background-repeat: repeat-x;
    background-size: 100% 2px;
    background-position: 50% 95%;
    -webkit-transition: color 150ms ease-in-out;
    -moz-transition: color 150ms ease-in-out;
    -ms-transition: color 150ms ease-in-out;
    -o-transition: color 150ms ease-in-out;
    transition: color 150ms ease-in-out;
}

a:focus {
    outline: none;
    background: #E9D8FD;
}

.post-content ul {
    margin: 1.5rem 0;
}

.post-content li {
    margin: 1rem 0;
}

.post-content form {
    display: none;
}

.post-content figure {
    margin: 0;
}

.post-content img {
    max-width: 425px;
}

</style>
