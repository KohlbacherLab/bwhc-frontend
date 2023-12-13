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
    catalogs: process.env.catalogs || '/bwhc/catalogs/api/',
    coding: process.env.coding || '/bwhc/catalogs/api/Coding',
    valueSet: process.env.valueSet || '/bwhc/catalogs/api/ValueSet',
    patient: process.env.patient || '/bwhc/mtb/api/data/qc/Patient',
    dataQualityReport: process.env.dataQualityReport || '/bwhc/mtb/api/data/DataQualityReport',
    mtbFile: process.env.mtbFile || '/bwhc/mtb/api/data/MTBFile',
    mtbFileView: process.env.mtbFileView ||  '/bwhc/mtb/api/data/MTBFileView',
    reporting: process.env.reporting || '/bwhc/mtb/api/reporting',
    preparedQueries: process.env.preparedQueries || '/bwhc/mtb/api/prepared-queries', 

    peerStatusReport: process.env.peerStatusReport || '/bwhc/peerStatusReport',

    users: process.env.users || '/bwhc/user/api/users',
    me: process.env.me || '/bwhc/user/api/whoami',
    logout: process.env.logout || '/bwhc/user/api/logout',

    version: 'v.2023-11'

  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#000' },

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

  serverMiddleware: ['~/middleware/errorHandler.js'],

  generate: {
    fallback: true, // Allow custom error pages to be generated as HTML files
  },
  
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-material-design-icons',
    '@nuxtjs/toast',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
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

    extend(config, ctx) {

    }
  }
}
