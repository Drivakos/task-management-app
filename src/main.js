import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Vuex from 'vuex' // import Vuex
import { db } from './firebase'


console.log(db)

createApp(App)
    .use(store)
    .use(Vuex)
    .mount('#app')
