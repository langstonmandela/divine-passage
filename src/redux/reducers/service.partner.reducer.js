const servicePartnerReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SERVICE_PARTNER':
            
            console.log(action.payload);
            return action.payload;
        case 'CLEAR':
            return [];
        default:
            return state;
    }
};
export default servicePartnerReducer;