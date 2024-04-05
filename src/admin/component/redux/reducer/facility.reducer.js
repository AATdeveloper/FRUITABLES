import { ADD_FACILITY, DELETE_DATA, GET_DATA, UPDATE_DATA } from "../ActionType";

const inistialState = {
    isLodaing: false,
    facilites: [],
    error: null
}

export const FacilitesReducer = (state = inistialState, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_FACILITY:

            return {
                ...state,
                facilites: state.facilites.concat(action.payload)
            }

        case DELETE_DATA:

            return {
                ...state,
                facilites: state.facilites.filter((v) => v.id !== action.payload)
            }

        case UPDATE_DATA:

            return {
                ...state,
                facilites: state.facilites.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v;
                    }
                })
            }
        case GET_DATA:

            return {
                ...state
            }

        default:
            return state
    }
}