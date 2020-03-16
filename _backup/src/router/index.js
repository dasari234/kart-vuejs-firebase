import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/Login';
import Profile from '@/components/Profile';
import Signup from '@/components/Signup';
import ResetPassword from '@/components/ResetPassword';
import Home from '@/components/Home';
import Admin from '@/components/Admin';
import Products from '@/components/shop/Products';
import Cart from '@/components/shop/Cart';
import Notfound from '@/components/Notfound';

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            name:'/',
            component:Home,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
			path: '/profile',
			name: 'profile',
			component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        {
			path: '/admin',
			name: 'admin',
			component: Admin,
            meta: {
                requiresAuth: true
            }
        },
        {
			path: '/signup',
			name: 'signup',
			component: Signup,
        },
        {
			path: '/products',
			name: 'products',
			component: Products,
        },
        {
			path: '/cart',
			name: 'cart',
			component: Cart,
        },
        {
			path: '/resetpassword',
			name: 'resetpassword',
			component: ResetPassword,
        },
        {
            path: "**",
            name: "http404",
            component: Notfound
          }
    ],
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    const currentUser = firebase.auth().currentUser;
    if (requiresAuth && !currentUser) {
        next('/login')
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
})

export default router