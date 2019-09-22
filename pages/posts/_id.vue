<template>
  <div>
    <div class="p-6 sm:p-10 md:p-16 flex flex-wrap">
      <div class="w-full md:w-1/2 md:pr-32 order-3 md:order-1">
        <div
          class="max-w-md md:float-right md:text-right leading-loose tracking-tight md:sticky md:top-0"
        >
          <p class="font-bold my-4 md:my-12">Posts</p>
          <post-links />
        </div>
      </div>
      <div class="w-full md:w-1/2 order-1 md:order-2">
        <div class="max-w-md leading-loose tracking-tight">
          <post-content />
        </div>
      </div>
    </div>

    <night-mode-toggle />
  </div>
</template>

<script>
import axios from "axios";
import Config from "~/assets/config";

import PostLinks from "@/components/PostLinks";
import PostContent from "@/components/PostContent";
import NightModeToggle from "@/components/NightModeToggle";

export default {
  components: {
    PostLinks,
    PostContent,
    NightModeToggle
  },
  methods: {
    toggleNightMode: function() {
      this.$store.commit("toggleNightMode");
    }
  }
};
</script>

<style>
</style>
