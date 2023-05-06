import { db } from '@/firebase'
import { createStore } from 'vuex'

export default createStore({
    state: {
        tasks: []
    },
    mutations: {
        async addTask(state, task) {
            try {
                const docRef = await db.collection('tasks').add(task)
                const newTask = { ...task, id: docRef.id }
                state.tasks.push(newTask)
                return newTask
            } catch (error) {
                console.error(error)
                throw new Error('Failed to add task')
            }
        },
        async editTask(state, { id, task }) {
            try {
                await db.collection('tasks').doc(id).set(task)
                const index = state.tasks.findIndex(t => t.id === id)
                state.tasks.splice(index, 1, task)
            } catch (error) {
                console.error(error)
                throw new Error('Failed to edit task')
            }
        },
        async deleteTask(state, id) {
            await db.collection('tasks').doc(id).delete()
            const index = state.tasks.findIndex(t => t.id === id)
            state.tasks.splice(index, 1)
        },
        async completeTask(state, { id }) {
            try {
                await db.collection('tasks').doc(id).set({status: 'Completed' }, { merge: true })
                const index = state.tasks.findIndex(t => t.id === id)
                state.tasks[index].status = 'Completed'
            } catch (error) {
                console.error(error)
                throw new Error('Failed to complete task')
            }
        },
        async incompleteTask(state, { id }) {
            try {
                await db.collection('tasks').doc(id).set({ status: 'Pending' }, { merge: true })
                const index = state.tasks.findIndex(t => t.id === id)
                state.tasks[index].status = 'Pending'
            } catch (error) {
                console.error(error)
                throw new Error('Failed to incomplete task')
            }
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
        },
        async completeTask({ commit }, id) {
            commit('completeTask', id)
        },
        async incompleteTask({ commit }, id) {
            commit('incompleteTask', id)
        }
    },
    getters: {
        tasks: state => state.tasks
    }
})
