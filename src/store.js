import { db } from '@/firebase'
import { createStore } from 'vuex'

export default createStore({
    state: {
        tasks: []
    },
    mutations: {
        async addTask(state, task) {
            const docRef = await db.collection('tasks').add(task)
            state.tasks.push({ ...task, id: docRef.id })
            console.log('Task added with ID: ', docRef.id)
        },
        async editTask(state, { id, task }) {
            await db.collection('tasks').doc(id).set(task)
            const index = state.tasks.findIndex(t => t.id === id)
            state.tasks.splice(index, 1, task)
        },
        async deleteTask(state, id) {
            await db.collection('tasks').doc(id).delete()
            const index = state.tasks.findIndex(t => t.id === id)
            state.tasks.splice(index, 1)
        },
        setTasks(state, tasks) {
            state.tasks = tasks
        }
    },
    actions: {
        async addTask({ commit }, task) {
            commit('addTask', task)
        },
        async editTask({ commit }, { id, task }) {
            commit('editTask', { id, task })
        },
        async deleteTask({ commit }, id) {
            commit('deleteTask', id)
        },
        async fetchTasks({ commit }) {
            const snapshot = await db.collection('tasks').get()
            const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            commit('setTasks', tasks)
        }
    },
    getters: {
        tasks: state => state.tasks
    }
})
