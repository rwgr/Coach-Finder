<template>
  <header class="header">
    <router-link to="/">
      <img src="../../images/icon.png" alt="coach finder icon" class="logo" />
    </router-link>
    <nav>
      <ul class="router-nav">
        <li>
          <router-link class="router-nav-link header-btn" to="/coaches"
            >View Coaches</router-link
          >
        </li>
        <li v-if="whoLogged && isCoach">
          <router-link class="router-nav-link header-btn" to="/requests"
            >View Requests
          </router-link>
        </li>
        <li>
          <auth-view></auth-view>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import AuthView from './AuthView.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  components: {
    AuthView,
  },
  setup() {
    const store = useStore();
    const whoLogged = computed(() => store.getters.getWhoLogged);
    const isCoach = computed(() => store.getters.getIsCoach);

    return { whoLogged, isCoach };
  },
};
</script>

<style scoped>
.router-nav {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.6rem;
}

.logo {
  height: 20rem;
}
</style>
