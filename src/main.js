
import Vue from 'vue'
import App from './App'
import router from './router'
import VuelazyLoad from 'vue-lazyload'
import store from './store/index'
Vue.use(VuelazyLoad, {
  loading: require('./common/image/default.png')
})
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import 'common/stylus/index.styl'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
