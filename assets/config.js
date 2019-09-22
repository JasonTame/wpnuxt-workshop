'use strict'

const apiEndpoint = '2019.capetown.wordcamp.org' 

export default {
  appTitleShort: 'wcct-2019-nuxt-workshop',
  appTitle: 'WCCT 2019 Nuxt Workshop',
  appTitleShort: 'wcct-2019-nuxt-workshop',
  appDescription: 'App for the Nuxt workshop at WCCT 2019',
  appThemeColor: '#ffffff',
  appBgColor: '#4a4a4a ',
  appIcon: 'assets/icon.png',
  // these are the rest api endpoints and your wordpress url 
  client: `https://${apiEndpoint}`, 
  wpDomain: `https://${apiEndpoint}/wp-json`,
  api: {
    posts: '/wp/v2/posts'
  }
}