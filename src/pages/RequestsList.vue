<template>
  <div class="container flex-column">
    <h1 class="heading-primary">Request List</h1>
    <base-spinner v-if="isLoading"></base-spinner>
    <request-list-item v-else>
      <slot></slot>
    </request-list-item>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import RequestListItem from '../components/requests/RequestListItem.vue';

export default {
  components: {
    RequestListItem,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters.getIsLoading);
    const loadCoachDetails = async () => {
      await store.dispatch('loadCoaches', {
        forceRefresh: true,
      });
    };
    loadCoachDetails();
    store.dispatch('loadRequests');

    return {
      isLoading,
    };
  },
};
</script>

<style scoped>
.request-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  width: 80rem;
}
</style>
