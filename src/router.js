import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

import CoachList from './pages/CoachList.vue';
import RequestsList from './pages/RequestsList.vue';
import ContactCoach from './components/coach/ContactCoach.vue';
import CoachDetails from './components/coach/CoachDetails.vue';
import RegisterCoach from './pages/RegisterCoach.vue';
import RegisterUser from './pages/RegisterUser.vue';

import { computed } from 'vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    { path: '/coaches/:id', component: CoachDetails },
    {
      path: '/requests',
      component: RequestsList,
      name: 'requests',
    },
    { path: '/contact', component: ContactCoach },
    { path: '/register', name: 'register', component: RegisterCoach },
    { path: '/:notFound(.*)', redirect: '/coaches' },
    { path: '/newUser', component: RegisterUser },
  ],
});

const userId = computed(() => store.getters.getUserId);

router.beforeEach(function (to, _, next) {
  if (to.name !== 'requests' && to.name !== 'register') {
    next();
  } else if (to.name === 'requests' && userId.value) {
    next();
  } else if (to.name === 'register' && userId.value) {
    next();
  } else {
    alert('You need to login to view requests!');
    next('/coaches');
  }
});

router.beforeEach(function (to, _, next) {
  if (to.name !== 'coaches') {
    store.dispatch('resetFilters');
    next();
  } else {
    next();
  }
});

export default router;
