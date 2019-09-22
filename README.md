# Getting started with headless WordPress and Nuxt
Repo containing all the code and instructions for the technical workshop on building a PWA with headless WordPress and Nuxt.js

Completed example - https://wcct19-nuxt-workshop.netlify.com/

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
  
  In assets/config.js, add the following code:

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

  The first 6 options will automatically populate a manifest.json file. 
  
  The Rest API endpoints will be used to fetch data from the WordPress site. 
  
</details>

<details>
  <summary>Step 2: Set up Vuex store</summary>

  Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. (https://vuex.vuejs.org)

  To set up a simple Vuex store in your Nuxt.js project, add the following code to store/index.js
  
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

  The nightmode toggle should now work :) 

  ![Night mode toggle](https://i.imgur.com/jg1tleR.gif)

 

</details>

<details>
  <summary>Step 3: Display links to recent blog posts</summary>
  
  Add the code below to pages/index.vue. Look for the comment titled 'Recent post links' and paste the first snippet there. 
  
  'latestPostLinks' is a computed property, and thus needs to go in the object titled 'computed' which you can find near the bottom of the page.

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

If all went well, you should now see a list of recent posts which have been pulled through from https://2019.capetown.wordcamp.org.

![Latest Post Links](https://i.imgur.com/GJUu4sj.png)

</details>

<details>
  <summary>Step 4: Display most recent post on home page</summary>
  
  The next step is to get some post content rendered on the screen. Add the div below the 'Most recent post' comment.

  The 'latestPost' computed property needs to go right below the 'latestPostLinks' property you added in the last step. 

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

  You should now see the content for the most recently published blog post appear. Well done! :) 
 ![Most recent blog post](https://i.imgur.com/dqNBGbq.png)

</details>

<details>
  <summary>Step 5: Display all post links</summary>

  If you click on any recent post link, you will be greeted with a nearly blank screen. This is because we are now loading pages/post/_id.vue which is a dynamic page that is meant to render single blog posts. Let's add some data to this page.

  The full list of blog post links is rendered by a component titled 'PostLinks' which can be found at components/PostLinks.vue. Add the code below to this file. 

  
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

  If you click on any recent post link, you should now see all the blog post links appear.

  ![All blog post links](https://i.imgur.com/LZIROuG.png)

</details>

<details>
  <summary>Step 6: Display all post content</summary>

  To render the content of any blog post, add the following code to components/PostContent.vue:
  
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

  You can now click on any link and the post content will be displayed

  ![All blog posts](https://i.imgur.com/WmTCVWT.png)
    
</details>

<details>
  <summary>Step 7: Run app in production mode</summary>

  To enable offline access and other PWA features, you need to run the app in production mode. To do so, terminate the current process which is running the dev server, and then run the following two commands:
  
  #### Build the app
  `npm run build`

  #### Start the production server
  `npm run start`
  
</details>
