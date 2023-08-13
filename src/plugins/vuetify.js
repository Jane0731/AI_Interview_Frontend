/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import DateFnsAdapter from '@date-io/date-fns'
import zhTW from 'date-fns/locale/zh-TW'
// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#0B346E',
          secondary: '#5CBBF6',
          background:'#F1EFEF'
        },
      },
    },
  },
  date: {
    adapter: DateFnsAdapter,
    locale: {
      en: zhTW,
    },
  },
  ssr: true,

})
