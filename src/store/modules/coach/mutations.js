export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  loadCoaches(state, payload) {
    state.coachesLoaded = true;
    state.coaches = payload;
  },
  updateActiveFilters(state, payload) {
    state.activeFilters = payload;
  },
  resetFilters(state) {
    state.activeFilters = {
      teacher: true,
      frontend: true,
      backend: true,
    };
  },
  coachDetailsUpdate(state, payload) {
    state.coachDetails = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
