import { db } from '@/firebase'
import { createStore } from 'vuex'
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default createStore({
    state: {
        tasks: [],
        userData: [],
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
        },
        setCurrentUser(state, user) {
            state.userData = user
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
            try {
                // Fetch the current user
                const auth = getAuth();
                const getCurrentUser = () =>
                    new Promise((resolve, reject) => {
                        onAuthStateChanged(auth, resolve, reject);
                    });

                const currentUser = await getCurrentUser();
                // Fetch tasks where UserId matches currentUser.uid
                const snapshot = await db.collection('tasks').where('userId', '==', currentUser.uid).get()

                // Map the documents to tasks array
                const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

                // Update the tasks in the store
                commit('setTasks', tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error)
            }
        },
        async completeTask({ commit }, id) {
            commit('completeTask', id)
        },
        async incompleteTask({ commit }, id) {
            commit('incompleteTask', id)
        },
        async fetchCurrentUser({ commit }) {
            try {
                const auth = getAuth();
                const getCurrentUser = () =>
                    new Promise((resolve, reject) => {
                        onAuthStateChanged(auth, resolve, reject);
                    });

                const currentUser = await getCurrentUser();
                const email = currentUser.email;
                const login = currentUser.displayName;
                const userId = currentUser.uid;
                const userMeta = currentUser.metadata
                // Create an object with user data
                const userData = {
                    email: email,
                    login: login,
                    userId: userId,
                    userMeta: userMeta
                };

                commit('setCurrentUser', userData);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        },
    },
    getters: {
        tasks: state => state.tasks,
        userData: state => state.userData,
    }
})
