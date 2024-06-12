import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { FacilitesReducer } from "./facility.reducer";
import { ProductsReducer } from "./products.reducer";
import { feuteditelReducer } from "./shop.reducece";
import counterSlice from "../slice/counter.slice";
import cartSlice from "../slice/cart.slice";
import coupenSlice from "../slice/coupen.slice";
import { categoryReducer } from "./category.reducer";
import subcategorySlice from "../slice/subcategory.slice";
import Products from "../../../container/Products/Products";

export const rootReducer = combineReducers({
    counter: counterReducer,
    facility: FacilitesReducer,
    products: ProductsReducer,
    feuteditel:feuteditelReducer,
    counter_slice : counterSlice,
    cart:cartSlice,
    coupen:coupenSlice,
    categories: categoryReducer,
    subcategories: subcategorySlice
})