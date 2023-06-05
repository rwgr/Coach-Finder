export default {
  submitRequest(context, payload) {
    context.commit('submitRequest', payload);
  },
  async registerRequest(context, payload) {
    // const currentDate = new Date().toLocaleDateString();
    // const currentTime = new Date().toLocaleTimeString();
    const requestData = {
      coachId: payload.coachId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      message: payload.message,
      email: payload.email,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    const response = await fetch(
      `${context.rootState.auth.dbURL}/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(requestData),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send message to coach!'
      );
      throw error;
    }
    context.commit('registerRequest', responseData);
  },
  async loadRequests(context) {
    context.commit('isLoading');
    const response = await fetch(
      `${context.rootState.auth.dbURL}/requests/${context.rootState.auth.userId}.json?auth=${context.rootState.auth.token}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to load requests!'
      );
      throw error;
    }
    context.commit('finishedLoading');
    const responseRequests = [];
    for (const key in responseData) {
      const request = {
        coachId: responseData[key].coachId,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        email: responseData[key].email,
        message: responseData[key].message,
        date: responseData[key].date,
        time: responseData[key].time,
      };
      responseRequests.push(request);
    }

    context.commit('loadRequests', responseRequests);
  },
  requestOpen(context) {
    context.commit('requestOpen');
  },
};
