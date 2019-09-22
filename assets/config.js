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