import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  carting: [],
  isloading: false,
  error: null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addtocarting: (state, action) => {

      console.log(action);

      const index = state.carting.findIndex((v) => v.pid === action.payload.id);
      if (index !== -1) {
        state.carting[index].qty += action.payload.count;
      } else {
        state.carting.push({ pid: action.payload, qty: action.payload.count })
      }
      console.log(state.carting);
    },
    incrementQty: (state, action) => {
      console.log(action);
      const index = state.cart.findIndex((v) => v.pid === action.payload);
      state.cart[index].qty++;
  },

  decrementQty: (state, action) => {
      console.log(action);
      const index = state.cart.findIndex((v) => v.pid === action.payload);
      state.cart[index].qty--;
  },

  removeProducts: (state, action) => {
      state.cart = state.cart.filter((v) => v.pid !== action.payload)
  }

  }
})

export const { addtocarting,incrementQty ,decrementQty,removeProducts} = cartSlice.actions

export default cartSlice.reducer
