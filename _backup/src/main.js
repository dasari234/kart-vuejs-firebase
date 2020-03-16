import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
const fb = require('./fireBaseConfig');
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification';
import velocity from 'velocity-animate'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Vuelidate);
Vue.use(Notifications, {velocity});

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