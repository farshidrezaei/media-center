import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        name: 'msapplication-TileColor',
        content: '#9f00a7'
      },
      {
        name: 'msapplication-TileImage',
        content: 'favicon//mstile-144x144.png'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        size: '180x180',
        href: '/favicon/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        size: '32x32',
        type: 'image/png',
        href: '/favicon/favicon-32x32.png'
      },
      {
        rel: 'icon',
        size: '16x16',
        type: 'image/png',
        href: '/favicon/favicon-16x16.png'
      },
      {
        rel: 'mask-icon',
        href: '/favicon/safari-pined-tab.svg',
        color: '#bc5bd5'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'swiper/dist/css/swiper.css',
    '~/assets/main.scss',
    '~/assets/notify.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/startup', mode: 'client' },
    '~/plugins/axios',
    '~/plugins/vue-phone-number-input',
    { src: '~/plugins/notification.js', mode: 'client' },
    { src: '~/plugins/swiper.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/auth', '@nuxtjs/pwa', '@nuxtjs/dotenv'],
  /*
   ** Axios module configuration
   */
  axios: {},

  pwa: {
    manifest: {
      name: 'MediaCenter',
      short_name: 'MediaCenter',
      start_url: '.',
      display: 'standalone',
      background_color: '#fff',
      description: 'Simple Media Center',
      icons: [
        {
          src: '~/favicon/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '~/favicon/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    icon: {
      iconSrc: '~/favicon/android-chrome-512x512.png'
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: false,
          logout: false,
          user: { url: 'auth/user', method: 'get', propertyName: 'user' }
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    plugins: [{ src: '~/plugins/axios', ssr: true }]
  },

  /*
   ** vuetify module configuration
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        light: {
          primary: '#673ab7',
          secondary: '#3f51b5',
          accent: '#03a9f4',
          error: '#f44336',
          warning: '#ffeb3b',
          info: '#2196f3',
          success: '#8bc34a'
        },
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
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
