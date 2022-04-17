import { createStore } from 'vuex';
import UserManagementModule from './UserManagement/index';

const store = createStore({
  modules: {
    userManagement: UserManagementModule,
  },
  // state is equivalent to data
  state() {
    return {
      user_id: null,
      user_token: null,
      isLogIn: false,
      // true means identity is user, false means identity is admin
      isUser: null,
    };
  },
  // getter is equivalent to computed property
  getters: {
    getUserId(state) {
      return state.user_id;
    },
    getUserToken(state) {
      return state.user_token;
    },
    getIsLogIn(state) {
      return state.isLogIn;
    },
    getIsUser(state) {
      return state.isUser;
    },
  },
  // mutation is equivalent to method
  mutations: {
    setUserId(state, data) {
      state.user_id = data.user_id;
    },
    setUserToken(state, data) {
      state.user_token = data.user_token;
    },
    setIsLogIn(state) {
      state.isLogIn = true;
    },
    setIsUser(state, data) {
      state.isUser = data.isUser;
    },
    setIsLogOut(state) {
      state.isLogIn = false;
    },
  },
  /**
   * action is similar to events, we should not call mutations directly from our vue app
   * we should always call the action that wraps the mutation to execute them
   */
  actions: {
    setUserId(context, data) {
      context.commit('setUserId', data);
    },
    setUserToken(context, data) {
      context.commit('setUserToken', data);
    },
    setIsLogIn(context) {
      context.commit('setIsLogIn');
    },
    setIsUser(context, data) {
      context.commit('setIsUser', data);
    },
    setIsLogOut(context) {
      context.commit('setIsLogOut');
    },
  },
});

export default store;
