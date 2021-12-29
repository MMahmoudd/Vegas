import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',

    env: {
        APP_URL: process.env.APP_URL || 'http://localhost:3000',
        API_URL: process.env.API_URL || 'http://197.51.199.78/api'
    },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Vegas',
    title: 'Vegas',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/logo.png' },
      { href: 'https://fonts.googleapis.com/css?family=Tajawal:400,500,700&display=swap&subset=arabic', rel: 'stylesheet' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.9.0/css/all.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/main.scss',
    '@/assets/style/styleEn.scss',
  ],
  router: {
    middleware: 'i18n'
},
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/i18n.js' },
  ],
//   generate: {
//     routes: ['/', '/contact', '/ar', '/ar/contact']
// },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/pwa'
  ],
  pwa: {
    meta: {
      title: 'Vegas',
      author: 'Vegas',
    },
    manifest: {
      name: 'Vegas',
      short_name: "Vegas",
      description: 'Welcome in Vegas',
      lang: 'en',
      display: "standalone",
      start_url: "/?standalone=true"
    },
    icon: {
      source: "./static/logo.png",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  transition: {
    name: 'fade-page',
    mode: 'out-in',
  }
}
