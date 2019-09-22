# Getting started with headless WordPress and Nuxt
Repo containing all the code and instructions for the technical workshop on building a site with headless WordPress and NuxtJS

## Installation instructions

#### Clone this repo:

`git clone https://github.com/JasonTame/wpnuxt-workshop.git`

#### Install dependencies

`npm install`

#### Run the development server

`npm run dev`

## Getting post data

<details>
  <summary>Step 1: Set up config.js</summary>
  
  
  ```javascript
  
  'use strict'

  const apiEndpoint = '2019.capetown.wordcamp.org' 

  export default {
    appTitleShort: 'WCCT 2019 Nuxt PWA',
    appTitle: 'WCCT 2019 Nuxt Workshop App',
    appDescription: 'App for the Nuxt workshop at WCCT 2019',
    appThemeColor: '#ffffff',
    appBgColor: '#252021',
    appIcon: 'assets/icon.png',

    // WP Rest Api endpoints
    client: `https://${apiEndpoint}`, 
    wpDomain: `https://${apiEndpoint}/wp-json`,
    api: {
      posts: '/wp/v2/posts'
    }
  }
  
  ```
  
</details>

<details>
  <summary>Step 2: Set up Vuex store</summary>
  
  ``` javascript
  import Config from '~/assets/config'
  import axios from 'axios'


  export const state = () => ({
    currentPost: '',
    nightMode: false,
    posts: [],
  });

  export const mutations = {
    setCurrentPost(state, obj) {
      state.currentPost = obj;
    },
    setPosts(state, obj) {
      state.posts = obj;
    },
    toggleNightMode(state) {
      state.nightMode = !state.nightMode;
    }
  }

  export const actions = {
    nuxtServerInit({ commit, state }) {
      // Get all posts
      return axios.get(Config.wpDomain + Config.api.posts)
          .then(res => commit('setPosts', res.data));
    },
  }
  ```
</details>

<details>
  <summary>Step 3: Display links to recent blog posts</summary>
  
  ``` javascript
  
  <ul class="flex flex-wrap justify-between flex-col">
    <li :key="post.id" v-for="post in latestPostLinks">
      <nuxt-link :to="`/posts/${post.id}`" v-html="post.title.rendered"></nuxt-link>
    </li>
  </ul>
  <nuxt-link to="/posts/" class="normal font-bold hover:font-bold">more...</nuxt-link>
  
  computed: {
    latestPostLinks() {
      return this.$store.state.posts.filter((post, idx) => idx < 3);
    },
  }
 
  ```
</details>

<details>
  <summary>Step 4: Display most recent post on home page</summary>
  
  ``` javascript
  
  <div class="max-w-md leading-loose tracking-tight">
    <h1 class="font-bold my-12">{{latestPost.title.rendered}}</h1>
    <div class="post-content" v-html="latestPost.content.rendered"></div>
  </div>
  
  computed: {
    latestPost() {
      return this.$store.state.posts[0];
    }
  }
 
  ```
</details>

<details>
  <summary>Step 5: Display all post links</summary>
  
  ``` javascript
  <template>
    <div>
      <ul class="flex flex-wrap justify-between flex-col">
        <li :key="post.id" v-for="post in posts">
          <nuxt-link :to="`/posts/${post.id}`" v-html="post.title.rendered"></nuxt-link>
        </li>
      </ul>
    </div>
  </template>

  <script>
    export default {
      computed: {
        posts() {
          return this.$store.state.posts;
        }
      }
    };
  </script>
  ```
</details>

<details>
  <summary>Step 6: Display all post content</summary>
  
  ``` javascript
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

  ```
    
</details>

<details>
  <summary>Step 7: Run app in production mode</summary>
  
  #### Build the app
  `npm run build`

  #### Start the production server
  `npm run start`
  
</details>
