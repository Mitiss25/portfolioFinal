import vitePluginGlsl from 'vite-plugin-glsl';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    plugins: [vitePluginGlsl()],
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=satoshi@700&display=swap' }]
    }
  }
})
