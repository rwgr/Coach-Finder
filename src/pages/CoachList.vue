<template>
  <div class="container">
    <h1 class="heading-primary relative">Find Your Coach</h1>
    <div class="flex-box">
      <coach-filter @change-filter="setFilters"></coach-filter>
      <button class="router-nav-link btn-refresh" @click="loadCoaches(true)">
        Refresh
      </button>
    </div>

    <base-spinner v-if="isLoading"></base-spinner>

    <coach-markup :coaches="filteredCoaches" v-if="!isLoading"></coach-markup>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CoachMarkup from '../components/coach/CoachMarkup.vue';
import CoachFilter from '../components/coach/CoachFilter.vue';
export default {
  components: {
    CoachMarkup,
    CoachFilter,
  },
  setup() {
    const store = useStore();
    const filteredCoaches = computed(() => store.getters.getFilteredCoaches);
    const isLoading = computed(() => store.getters.getIsLoading);

    function setFilters(updatedFilters) {
      store.dispatch('updateActiveFilters', updatedFilters);
    }

    const loadCoaches = async (refresh = false) => {
      await store.dispatch('loadCoaches', {
        forceRefresh: refresh,
      });
    };

    loadCoaches();

    return { filteredCoaches, setFilters, isLoading, loadCoaches };
  },
};
</script>

<style scoped>
.flex-box {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px dashed #9a66b3;
  margin-bottom: 1.2rem;
  align-items: center;
}
.btn-refresh {
  align-self: flex-start;
}
</style>
