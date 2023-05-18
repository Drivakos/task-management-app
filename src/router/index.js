import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('../views/HomeView.vue') },
        { path: '/login', component: () => import('../views/LoginView.vue') },
        { path: '/register', component: () => import('../views/RegisterView.vue') }
    ]
});

const auth = getAuth();

const getCurrentUser = () =>
    new Promise((resolve, reject) => {
        onAuthStateChanged(auth, resolve, reject);
        // Alternatively, you can use:
        // const unsubscribe = onAuthStateChanged(auth, user => {
        //   unsubscribe();
        //   resolve(user);
        // }, reject);
    });

router.beforeEach(async (to, from, next) => {
    const currentUser = await getCurrentUser();
    const isAuthenticated = Boolean(currentUser);

    if (isAuthenticated) {
        next();
    } else {
        if (to.path === '/login' || to.path === '/register') {
            // Allow access to login and register routes if not authenticated
            next();
        } else {
            if (localStorage.getItem('user') === null) {
                next('/login');
            } else {
                alert('You are not logged in');
                next('/login');
            }
        }
    }
});

export default router;
