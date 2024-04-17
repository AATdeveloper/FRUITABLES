import { ADD_PRODUCTS, GET_PRODUCTS } from "../ActionType";

const inistialState = {
    isLoading: false,
    products: [],
    error: null
}


export const ProductsReducer = (state = inistialState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_PRODUCTS:

            return {
                isLodaing: false,
                products: action.payload,
                error: null



            }
        default:
            return state
    }
}
