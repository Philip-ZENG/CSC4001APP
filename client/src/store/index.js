import { createStore } from 'vuex';

const store = createStore({
  // state is equivalent to data
  state() {
    return {
      user_id: null,
      user_token: null,
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
  },
  // mutation is equivalent to method
  mutations: {
    setUserId(state, data) {
      state.user_id = data.user_id;
    },
    setUserToken(state, data) {
      state.user_token = data.user_token;
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
  },
});

export default store;
