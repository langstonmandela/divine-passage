const intakeReducer = (state = [], action) =>{
    switch (action.type) {
        case 'SET_INTAKE':
            // Set the intake data into the state
                return action.payload;
        default:
            return state;
    }
};

export default intakeReducer;