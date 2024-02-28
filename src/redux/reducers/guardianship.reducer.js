const guardianshipReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GUARDIANSHIP':
            // Set the guardianship data into the state
            return action.payload;
        case 'CLEAR_GUARDIANSHIP':
            // Clear the guardianship data
            return [];
        default:
            return state;
    }
};

export default guardianshipReducer;
