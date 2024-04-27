import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { FacilitesReducer } from "./facility.reducer";
import { productsReducer } from "./products.reducer";
import { shopReducer } from "./shop.reducer";
import { reviewReducer } from "./reviews.reducer";
import counterSlice from "../slice/counter.slice";
import cartSlice from "../slice/cart.slice";
import couponSlice from "../slice/coupon.slice";







export const rootReducer = combineReducers({
    counter: counterReducer,
    facilites: FacilitesReducer,
    products: productsReducer,
    shop: shopReducer,
    review: reviewReducer,
    counter_slice: counterSlice,
    cart: cartSlice,
    coupon:couponSlice,
    // cartinToolkit: cartSlice,
    couponInCart: couponSlice,

   
    
})




