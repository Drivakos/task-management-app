import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Vuex from 'vuex' // import Vuex

createApp(App).use(store).use(Vuex).mount('#app') // use Vuex as a plugin
