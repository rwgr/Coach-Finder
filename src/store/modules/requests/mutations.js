export default {
  submitRequest(state, payload) {
    state.requests.push(payload);
  },
  registerRequest(state, payload) {
    state.requests.push(payload);
  },
  loadRequests(state, payload) {
    state.requests = payload;
  },
  isLoading(state) {
    state.isLoading = true;
  },
  finishedLoading(state) {
    state.isLoading = false;
  },
  requestOpen(state) {
    state.isRequestOpen = !state.isRequestOpen;
  },
};
