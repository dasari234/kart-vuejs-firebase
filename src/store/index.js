
import Vue from 'vue'
import Vuex from 'vuex'
import usersModule from './modules/users';
import shopModule from './modules/shops';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        users: usersModule,
        shops:shopModule
    },
});