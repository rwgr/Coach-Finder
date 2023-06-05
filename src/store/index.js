import { createStore } from 'vuex';
// import actions from './actions.js';
// import mutations from './mutations.js';
// import getters from './getters.js';

import authModule from './modules/auth/index.js';
import coachModule from './modules/coach/index.js';
import requestsModule from './modules/requests/index.js';

const store = createStore({
  modules: {
    coach: coachModule,
    requests: requestsModule,
    auth: authModule,
  },
});

export default store;
