const pkg = require('./package')


const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  ssr: false,

  /*
  ** Headers of the page
  */
  head: {
    title: "bwHealthCloud",

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [

      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '/fontawesome-free-5.12-2.0-web/css/all.css'
      }
    ]
  },

  env: {

    baseUrl: process.env.BASE_URL || 'http://localhost',
    port: process.env.port || ':9000',

    query: process.env.query || '/bwhc/mtb/api/query',
    coding: process.env.coding || '/bwhc/catalogs/api/Coding',
    valueSet: process.env.valueSet || '/bwhc/catalogs/api/ValueSet',
    patient: process.env.patient || '/bwhc/mtb/api/data/qc/Patient',
    dataQualityReport: process.env.dataQualityReport || '/bwhc/mtb/api/data/DataQualityReport',
    mtbFile: process.env.mtbFile || '/bwhc/mtb/api/data/MTBFile',
    reporting: process.env.reporting || '/bwhc/mtb/api/reporting',

    users: process.env.users || '/bwhc/user/api/users',
    me: process.env.me || '/bwhc/user/api/whoami',
    logout: process.env.logout || '/bwhc/user/api/logout'

  },


  axios: {
    //baseUrl: process.env.BASE_URL || 'TBA',
    //browserBaseURL: process.env.BASE_URL || 'TBA'
  },


  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/main'
    },
    strategies: {
      local: {
        token: {
          required: true,
          type: false
        },
        endpoints: {
          login: { url: process.env.BASE_URL + process.env.port + '/bwhc/user/api/login', method: 'post', propertyName: 'custom' },
          //user: {url: process.env.BASE_URL + process.env.port + '/bwhc/user/api/whoami', method: 'get', propertyName: 'data'},
          logout: { url: process.env.BASE_URL + process.env.port + '/bwhc/user/api/logout', method: 'delete' }
        }
      }
    }
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-material-design-icons',
    '@nuxtjs/toast'

  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    axios: {
      baseURL: 'http://localhost:6060',
      proxyHeaders: false,
      credentials: false
    },

    /*
    ** You can extend webpack config here
    */

    extend(config, ctx) {

    }
  }
}
