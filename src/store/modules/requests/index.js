import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      requests: [],
      isLoading: false,
      isRequestOpen: false,
    };
  },
  mutations,
  actions,
  getters,
};
