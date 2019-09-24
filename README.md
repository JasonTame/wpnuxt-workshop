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
  <summary><b>Step 1: Set up config.js</b></summary>
  
  <p></p>
  In assets/config.js, add the following code:
  <p></p>

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
  <p>The first 6 options will automatically populate a manifest.json file. </p>

  <p>The Rest API endpoints will be used to fetch data from the WordPress site.</p>
  
</details>

<details>
  <summary><b>Step 2: Set up Vuex store</b></summary>
  <p></p>
  <p>Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. (https://vuex.vuejs.org)</p>

  <p>To set up a simple Vuex store in your Nuxt.js project, add the following code to store/index.js</p>
  
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

  <p>The nightmode toggle should now work :)</p> 

  ![Night mode toggle](https://i.imgur.com/jg1tleR.gif)


</details>

<details>
  <summary><b>Step 3: Display links to posts</b></summary>
  <p></p>
  In the previous step we stored the post data to the Vuex store, so we now have access to that data. Let's add some links on the home page (pages/index.vue)
  and on the post page (pages/posts/_id.vue)

  #### Set up the PostLinks component

  The code which renders the links should be added to a component called PostLinks. This component can be found in components/PostLinks.vue.

  This component includes an unordered list of links. It has a single prop called 'posts' which we can pass our posts to in order to dsiplay the links. 

  Add the code below to PostLinks.vue

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
      props: {
        posts: {}
      }
    };
  </script>

  ```

  #### Show most recent posts on the home page

  In pages/index.vue, lets add a computed property which returns the latest 3 posts. Add this code below the components property near the bottom of the file. Make sure you add a comma between them!  

  ``` javascript 
  computed: {
    latestPostLinks() {
      return this.$store.state.posts.filter((post, idx) => idx < 3);
    }
  }
  ```

  The PostLinks component has already been imported and registered, so all we need to do is add it to the template and give it 'latestPostLinks' as a prop.

  Add the following code after the 'Recent post links' comment:

  ``` javascript
    <post-links :posts="latestPostLinks" />
    <nuxt-link to="/posts/" class="normal font-bold hover:font-bold">more...</nuxt-link>
  ```
  
  Your home page should now look like this:

  ![Recent post links](https://i.imgur.com/GJUu4sj.png)

  ##### Add all post links to post page

  The post page can be found at pages/posts/_id.vue. This is a dynamic page which is used to render any blog post. 

  We already have the full list of posts in the store, so all we need to do is add the PostLinks component and pass it all the posts.

  Add the following code after the 'All post links' comment:

  ``` javascript
    <post-links :posts="this.$store.state.posts" />
  ```

  Your post page should now contain a list of all posts:

  ![All post links](https://i.imgur.com/LZIROuG.png)

</details>

<details>
  <summary><b>Step 4: Display post content</b></summary>
   
  #### Set up PostContent component

  In components/PostContent.vue, add this code which will be used to display the title and content of the current post which is being viewed:

  ``` javascript
    <template>
      <div class="max-w-md leading-loose tracking-tight">
        <h1 class="font-bold my-12" v-html="currentPost.title.rendered"></h1>
        <div class="post-content" v-html="currentPost.content.rendered"></div>
      </div>
    </template>
  ```
  
  It's looking to use 'currentPost' to get the data, which currently doesn't exist. We need to create a currentPost computed property which will look at the current URL and see if it has an ID number. If it finds one, it will use that to determine which post to show. If there is no ID (which will be the case when the user is on the home page) it will just return the first post in the list. 

  Add the following code below the template tags in components/PostContent.vue:

  ``` javascript
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

  #### Display post content on the home page and the post page

  We are almost there! The last step is simply to add the PostContent component to the home and post page templates. The component has already been imported and registered, so add the following line below the 'Post content' comment on both pages/index.vue and pages/posts/_id.vue:

  ``` javascript
    <post-content />
  ```

</details>

## Run app in production mode

To enable offline access and other PWA features, you need to run the app in production mode. To do so, terminate the current process which is running the dev server, and then run the following two commands:
  
#### Build the app
`npm run build`

#### Start the production server
`npm run start`
