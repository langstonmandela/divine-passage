// Define the initial state of the reducer. This state includes:
// - servicePartners: an array to store the service partners fetched from the server.
// - isLoading: a boolean to track whether a request is in progress.
// - error: a value to hold any error messages from failed requests.
const initialState = {
    servicePartners: [],
    isLoading: false,
    error: null,
};

// Define the service partner reducer function.
// This reducer updates the state based on the action type received.
const servicePartnerReducer = (state = initialState, action) => {
    switch (action.type) {
        // When a fetch request starts, set isLoading to true and clear any previous errors.
        case 'FETCH_SERVICE_PARTNERS':
            return { ...state, isLoading: true, error: null };
        
        // On successful fetch, update the servicePartners array with the new data,
        // and set isLoading back to false.
        case 'FETCH_SERVICE_PARTNERS_SUCCESS':
            return { ...state, servicePartners: action.payload, isLoading: false };
        
        // If the fetch fails, set isLoading to false and store the error message.
        case 'FETCH_SERVICE_PARTNERS_FAILED':
            return { ...state, isLoading: false, error: action.payload };
        
        // After successfully creating a service partner, simply set isLoading to false.
        case 'CREATE_SERVICE_PARTNER_SUCCESS':
            return { ...state, isLoading: false };
        
        // If creation fails, set isLoading to false and store the error message.
        case 'CREATE_SERVICE_PARTNER_FAILED':
            return { ...state, isLoading: false, error: action.payload };
        
        // For any action that doesn't match the above cases, return the current state.
        default:
            return state;
    }
};

// Export the reducer for use in the Redux store setup.
export default servicePartnerReducer;
