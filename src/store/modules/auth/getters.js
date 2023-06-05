export default {
  getError(state) {
    return state.error;
  },
  getUserId(state) {
    return state.userId;
  },
  getWhoLogged(state) {
    if (state.token && state.userId) {
      return true;
    } else {
      return false;
    }
  },
  getShowLogin(state) {
    return state.showLogin;
  },
  getShowPassword(state) {
    return state.showPassword;
  },
  getCurrentUser(state, rootState) {
    const coaches = rootState.getCoaches;
    const [currentCoach] = coaches.filter((uid) => uid.id === state.userId);
    if (currentCoach === undefined) {
      return;
    } else {
      return currentCoach?.firstName + ' ' + currentCoach?.lastName;
    }
  },
  getIsCoach(state, rootState) {
    const coaches = rootState.getCoaches;
    const [currentCoach] = coaches.filter((uid) => uid.id === state.userId);
    console.log(currentCoach);
    if (currentCoach === undefined) {
      return false;
    } else {
      return true;
    }
  },
};
