export default {
  logout(state) {
    state.isLoggedIn = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
  },
  handleError(state) {
    state.error = null;
  },
  updateError(state, payload) {
    state.error = payload;
  },
  closeLogin(state) {
    state.showLogin = false;
  },
  openLogin(state) {
    state.showLogin = true;
  },
  showPassword(state) {
    state.showPassword = !state.showPassword;
  },
};
