import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      coaches: [],
      filters: {
        teacher: true,
        frontend: true,
        backend: true,
      },
      activeFilters: {
        teacher: true,
        frontend: true,
        backend: true,
      },
      coachDetails: [],
      lastFetch: null,
    };
  },
  mutations,
  actions,
  getters,
};
