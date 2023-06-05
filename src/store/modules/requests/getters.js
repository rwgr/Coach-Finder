export default {
  getFilteredRequests(state, rootState) {
    return state.requests.filter((cid) => cid.coachId === rootState.getUserId);
  },
  getIsLoading(state) {
    return state.isLoading;
  },
  getIsRequestOpen(state) {
    return state.isRequestOpen;
  },
};
