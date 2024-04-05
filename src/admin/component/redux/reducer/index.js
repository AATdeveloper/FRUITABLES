import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { FacilitesReducer } from "./facility.reducer";
import { ProductsReducer } from "./products.reducer";

export const rootReducer = combineReducers({
    counter: counterReducer,
    facility: FacilitesReducer,
    products: ProductsReducer
})