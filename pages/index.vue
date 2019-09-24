<template>
  <div>
    <div class="p-6 sm:p-10 md:p-16 flex flex-wrap">
      <div class="w-full md:w-1/2 md:pr-32 order-3 md:order-1">
        <div
          class="max-w-md md:float-right md:text-right leading-loose tracking-tight md:sticky md:top-0"
        >
          <p class="font-bold my-4 md:mt-12 md:mb-4">Recent Posts</p>
          <!-- Recent post links -->
          <post-links :posts="latestPostLinks" />
          <nuxt-link to="/posts/" class="normal font-bold hover:font-bold">more...</nuxt-link>
        </div>
      </div>

      <div class="w-full md:w-1/2 order-1 md:order-2">
        <!-- Post content -->
        <post-content />
      </div>

      <div class="w-full md:w-1/2 md:pr-32 pt-12 md:pt-0 md:sticky md:bottom-0 order-4 md:order-3">
        <div class="max-w-md md:float-right md:text-right leading-loose tracking-tight md:mb-16">
          <p class="font-bold my-4 md:mt-12 md:mb-4">Contact</p>

          <social-links />
        </div>
      </div>

      <home-link />
      <night-mode-toggle />

      <div class="w-full md:w-1/2 order-2 md:order-4">
        <about-word-camp />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Config from "~/assets/config";

import HomeLink from "@/components/HomeLink";
import PostLinks from "@/components/PostLinks";
import PostContent from "@/components/PostContent";
import SocialLinks from "@/components/SocialLinks";
import NightModeToggle from "@/components/NightModeToggle";
import AboutWordCamp from "@/components/AboutWordCamp";

export default {
  head() {
    return {
      title: "WCCT 2019 Nuxt Workshop"
    };
  },
  components: {
    HomeLink,
    PostLinks,
    PostContent,
    SocialLinks,
    NightModeToggle,
    AboutWordCamp
  },
  computed: {
    latestPostLinks() {
      return this.$store.state.posts.filter((post, idx) => idx < 3);
    }
  }
};
</script>

<style>
</style>
