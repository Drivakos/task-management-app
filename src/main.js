import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Vuex from 'vuex'
import '@fortawesome/fontawesome-free/css/all.css'
import router from "@/router";

createApp(App)
    .use(store)
    .use(Vuex)
    .use(router)
    .mount('#app')
