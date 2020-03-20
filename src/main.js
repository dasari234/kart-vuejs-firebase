import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
const fb = require('./fireBaseConfig');
import Vuelidate from 'vuelidate';
import VueToast from 'vue-toast-notification';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Vuelidate);
Vue.use(VueToast,{position: 'top'});

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import './assets/scss/app.scss'

Vue.config.productionTip = false;

let app
fb.auth.onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})