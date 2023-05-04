import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Vuex from 'vuex'
import { db } from './firebase'
import '@fortawesome/fontawesome-free/css/all.css'

console.log(db)
const tasksRef = db.collection('tasks')
console.log(tasksRef)
createApp(App)
    .use(store)
    .use(Vuex)
    .mount('#app')
