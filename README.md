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

</details>

<details>
  <summary><b>Step 4: Display post content</b></summary>
  

</details>

## Run app in production mode

To enable offline access and other PWA features, you need to run the app in production mode. To do so, terminate the current process which is running the dev server, and then run the following two commands:
  
  #### Build the app
  `npm run build`

  #### Start the production server
  `npm run start`
