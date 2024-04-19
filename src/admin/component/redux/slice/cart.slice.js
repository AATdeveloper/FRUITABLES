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
    // incrementqty: (state, action) => {
    //   console.log(action.payload);
    //   const index = state.carting.findIndex((v) => v.pid === action.payload);
    //   if (index !== -1) {
    //     state.carting[index].qty++;
    //   }

    // },
    // decrementqty: (state, action) => {
    //   console.log(action);
    //   const index = state.carting.findIndex((v) => v.pid === action.payload);
    //   if (index !== -1 && state.carting[index].qty > 1) {
    //     state.carting[index].qty--;

    //   }

    // },
    // removeProducts: (state, action) => {
    //   state.carting = state.carting.filter((v) => v.pid !== action.payload)
    // }

  }
})

export const { addtocarting } = cartSlice.actions

export default cartSlice.reducer
