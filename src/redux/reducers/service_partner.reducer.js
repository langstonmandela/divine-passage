const servicePartnerReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SERVICE_PARTNER':
      return action.payload;
    default:
      return state;
  }
};
export default servicePartnerReducer;
