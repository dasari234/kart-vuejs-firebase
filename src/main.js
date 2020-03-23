import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
const fb = require('./fireBaseConfig');
import vuelidate from 'vuelidate';
import vueToast from 'vue-toast-notification';

import vuetify from '@/plugins/vuetify'

import 'vue-toast-notification/dist/theme-default.css';

Vue.use(vuelidate);
Vue.use(vueToast,{position: 'top'});

import 'bootstrap/dist/css/bootstrap.css'

import './assets/scss/app.scss'

Vue.config.productionTip = false;

let app
fb.auth.onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            el: '#app',
            vuetify,
            router,
            store,
            render: h => h(App)
        })
    }
})