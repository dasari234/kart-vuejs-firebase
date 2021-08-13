import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
const fb = require('./fireBaseConfig');
import vuelidate from 'vuelidate';
import vueToast from 'vue-toast-notification';
import { BootstrapVue } from 'bootstrap-vue';
import vuetify from '@/plugins/vuetify'

import 'vue-toast-notification/dist/theme-default.css';

Vue.use(vuelidate);
Vue.use(vueToast, { position: 'top' });
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/app.scss'

//import cityCode from './components/filters/city-code';
Vue.config.productionTip = false;
//Vue.filter('city-code', cityCode);
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