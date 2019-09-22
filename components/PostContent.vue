<template>
  <div class="max-w-md leading-loose tracking-tight">
    <h1 class="font-bold my-12" v-html="currentPost.title.rendered"></h1>
    <div class="post-content" v-html="currentPost.content.rendered"></div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.currentPost.title.rendered
    };
  },
  computed: {
    currentPost() {
      let postID = this.$route.params.id
        ? this.$route.params.id
        : this.$store.state.posts[0].id;

      let currentPost = this.$store.state.posts.find(post => post.id == postID);

      this.$store.commit("setCurrentPost", currentPost);
      return currentPost;
    }
  }
};
</script>