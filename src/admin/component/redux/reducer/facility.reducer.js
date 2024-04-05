import { ADD_FACILITY, DELETE_DATA, GET_DATA, LOADING_FACILITY, UPDATE_DATA } from "../ActionType";

const inistialState = {
    isLoading: false,
    facilites: [],
    error: null
}

export const FacilitesReducer = (state = inistialState, action) => {
    console.log(action);

    switch (action.type) {

        case LOADING_FACILITY:

            return {
                ...state,
                isLoading: true
            }
        case ADD_FACILITY:

            return {
                ...state,
                isLoading: false,
                facilites: state.facilites.concat(action.payload)
            }

        case DELETE_DATA:

            return {
                ...state,
                isLoading: false,
                facilites: state.facilites.filter((v) => v.id !== action.payload)
            }

        case UPDATE_DATA:

            return {
                ...state,
                isLoading: false,
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