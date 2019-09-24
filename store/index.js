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