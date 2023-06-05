export default {
  getCoaches(state) {
    return state.coaches;
  },
  getFilters(state) {
    return state.filters;
  },
  getActiveFilters(state) {
    return state.activeFilters;
  },
  getFilteredCoaches(state) {
    return state.coaches.filter((coach) => {
      if (state.activeFilters.frontend && coach.areas.includes('Frontend')) {
        return true;
      }
      if (state.activeFilters.teacher && coach.areas.includes('Teacher')) {
        return true;
      }
      if (state.activeFilters.backend && coach.areas.includes('Backend')) {
        return true;
      }
      return false;
    });
  },
  getCoachDetails(state) {
    return state.coachDetails;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();

    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
