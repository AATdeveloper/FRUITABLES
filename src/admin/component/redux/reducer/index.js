import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { FacilitesReducer } from "./facility.reducer";
import { ProductsReducer } from "./products.reducer";
import { feuteditelReducer } from "./shop.reducece";
import counterSlice from "../slice/counter.slice";
import cartSlice from "../slice/cart.slice";

export const rootReducer = combineReducers({
    counter: counterReducer,
    facility: FacilitesReducer,
    products: ProductsReducer,
    feuteditel:feuteditelReducer,
    counter_slice : counterSlice,
    cart:cartSlice
})