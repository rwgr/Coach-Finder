<template>
  <form class="filter">
    <h3 class="heading-tertiary">Filter by area of expertise:</h3>
    <div>
      <span class="filter-tags">
        <label for="teacher">Teacher:&nbsp; </label>
        <input type="checkbox" id="teacher" checked @change="setFilter" />
      </span>
      <span class="filter-tags">
        <label for="frontend">Frontend:&nbsp;</label>
        <input type="checkbox" id="frontend" checked @change="setFilter" />
      </span>
      <span class="filter-tags">
        <label for="backend">Backend:&nbsp; </label>
        <input type="checkbox" id="backend" checked @change="setFilter" />
      </span>
    </div>
  </form>
</template>

<script>
import { useStore } from 'vuex';

export default {
  emits: ['change-filter'],
  setup(_, { emit }) {
    const store = useStore();
    let filters = store.getters.getFilters;

    function setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;

      const updatedFilters = {
        ...filters,
        [inputId]: isActive,
      };
      filters = updatedFilters;
      emit('change-filter', updatedFilters);
    }

    return { setFilter };
  },
};
</script>

<style scoped>
.filter {
  display: flex;
  gap: 2.4rem;
  align-items: center;
}

h3 {
  margin-top: 0;
}

.filter-tags {
  margin-right: 1.5rem;
}

.filter-tags input {
  cursor: pointer;
}

.filter-tags label {
  font-size: 1.53rem;
  font-weight: 500;
}
</style>
