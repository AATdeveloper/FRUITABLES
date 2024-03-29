import { ADD_FACILITY } from "../ActionType";


const initialState = {
    isLoading: false,
    count: 0,
    error: null
}

export const facilityReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case ADD_FACILITY:
            return {
                count: state.
            }

        default:
            return state
    }
}