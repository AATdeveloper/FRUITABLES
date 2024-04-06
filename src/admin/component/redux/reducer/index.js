import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { FacilitesReducer } from "./facility.reducer";
import { ProductsReducer } from "./products.reducer";
import { feuteditelReducer } from "./shop.reducece";

export const rootReducer = combineReducers({
    counter: counterReducer,
    facility: FacilitesReducer,
    products: ProductsReducer,
    feuteditel:feuteditelReducer
})