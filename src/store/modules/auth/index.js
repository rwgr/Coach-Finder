import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      apiKey: 'example',
      dbURL: 'example',
      token: '',
      userId: null,
      didAutoLogout: false,
      error: null,
      showLogin: null,
      showPassword: false,
    };
  },
  mutations,
  actions,
  getters,
};
