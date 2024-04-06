import {  GET_FRUTES_DATA } from "../ActionType";

const inistialState = {
    isLoading: false,
    fruts: [],
    error: null
}


export const feuteditelReducer = (state = inistialState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_FRUTES_DATA:

            return {
                isLodaing: false,
                fruts: action.payload,
                error: null
          

               
            }
            default :
            return state
        }
    }
