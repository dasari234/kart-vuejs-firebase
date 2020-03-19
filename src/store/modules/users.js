const fb = require('../../fireBaseConfig');

export default {
    namespaced: true,
    state: {
        currentUser: null,
        userProfile: {},
    },
    actions: {
        clearData: ({ commit }) => {
            commit('SET_CURRENT_USER', null)
            commit('SET_USER_PROFILE', {})
        },
        fetchUserProfile: ({ commit, state }) => {
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                localStorage.setItem("uid", state.currentUser.uid);
                commit('SET_USER_PROFILE', res.data())
            }).catch(err => {
                console.log(err)
            })
        },
        setCurrentUser: ({ commit}, user) => {
            commit('SET_CURRENT_USER', user);
        },
        setUserProfile: ({ commit }, user) => {
            commit('SET_USER_PROFILE', user)
        },
        setUsers: ({ commit }, users) => {
            commit('SET_USERS', users)
        }
    },
    mutations: {
        SET_CURRENT_USER: (state, val) => {
            state.currentUser = val;
        },
        SET_USER_PROFILE: (state, val) => {
            state.userProfile = val;
        },
        SET_USERS: (state, val) => {
            state.users = val;
        }
    },
    getters: {
        getCurrentUser: state => {
            return state.currentUser;
        },
        getUserProfile: state => {
            return state.userProfile;
        },
        getShortName: state => {
            const fName = state.userProfile.firstName.charAt(0);
            const lName = state.userProfile.lastName.charAt(0);
            const shortName = fName.toUpperCase() + lName.toUpperCase();

            return shortName;
        }
    }
}