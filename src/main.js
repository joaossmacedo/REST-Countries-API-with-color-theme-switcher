import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faSearch, faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowLeft)
library.add(faSearch)
library.add(faMoon)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
Vue.component('v-select', vSelect)
