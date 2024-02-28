// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=satoshi@700&display=swap' }],
      script: [{ src: '/plugins/pixel.js', defer: true}]
    }
  }
})
