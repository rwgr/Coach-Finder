export default {
  async registerCoach(context, payload) {
    const coachData = {
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      description: payload.description,
      rate: payload.rate,
      areas: payload.areas,
      isCoach: true,
    };

    const response = await fetch(
      `${context.rootState.auth.dbURL}/coaches/${context.rootState.auth.userId}.json?auth=${context.rootState.auth.token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );
    // const responseData = await response.json();
    if (!response.ok) {
      throw new Error('Failed to register coach details!');
    }

    context.commit('registerCoach', { ...coachData, id: context.state.userId });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    context.commit('isLoading');
    const response = await fetch(
      `${context.rootState.auth.dbURL}/coaches/.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to load coaches!'
      );
      throw error;
    }
    context.commit('finishedLoading');
    const responseCoaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        email: responseData[key].email,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        rate: responseData[key].rate,
        areas: responseData[key].areas,
      };
      responseCoaches.push(coach);
    }
    context.commit('loadCoaches', responseCoaches);
    context.commit('setFetchTimestamp');
  },
  updateActiveFilters(context, payload) {
    context.commit('updateActiveFilters', payload);
  },

  resetFilters(context) {
    context.commit('resetFilters');
  },
  coachDetailsUpdate(context, payload) {
    context.commit('coachDetailsUpdate', payload);
  },
};
