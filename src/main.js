import { createApp } from 'vue'

// 匯入 vee-validate 主套件
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'

// 匯入 vee-validate 相關規則
import AllRules from '@vee-validate/rules'

// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n'

// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import axios from 'axios'
import VueAxios from 'vue-axios'

// Side effect
// npm i @popperjs/core
import 'bootstrap'

// import $ from 'jquery'

import { toCurrency, date } from './methods/filters'
import $httpMessageState from '@/methods/pushMessageState'
import $httpSideMessageState from '@/methods/pushSideMessageState'

// sweetalert2套件
// import VueSweetalert2 from 'vue-sweetalert2'
// import 'sweetalert2/dist/sweetalert2.min.css'

// 加入loading套件
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

import AOS from 'aos'
import '../node_modules/aos/dist/aos.css'

import App from './App.vue'
import router from './router'

// 定義驗證規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})

// 設定預設語系
setLocale('zh_TW')

const app = createApp(App)
// 註冊
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('Loading', Loading)

app.use(VueAxios, axios)
app.use(AOS)
AOS.init()

// jquery啟用
// window.$ = $

// 加到全域屬性下
app.config.globalProperties.$filters = {
  toCurrency,
  date
}
app.config.globalProperties.$httpMessageState = $httpMessageState
app.config.globalProperties.$httpSideMessageState = $httpSideMessageState

// Sweetalert啟用(全域樣式調整)
// const options = {
//   confirmButtonColor: '#aaa',
//   cancelButtonColor: '#fff',
//   icon: 'info'
// }
// app.use(VueSweetalert2, options)

app.use(router)
app.mount('#app')
