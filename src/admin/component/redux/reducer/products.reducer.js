import { ADD_PRODUCTS } from "../ActionType";

const inistialState = {
    isLodaing: false,
    products: [],
    error: null
}


export const ProductsReducer = (state = inistialState, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_PRODUCTS:

            return {
                isLodaing: false,
                products: action.payload,
                error: null
          

               
            }
            default :
            return state
        }
    }
