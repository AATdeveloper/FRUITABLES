import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  carting: [],
  isloading:false,
  error:null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState:initialState,
  reducers: {
   addtocarting: (state,action) => {

    console.log(action);

    const index = state.carting.findIndex((v) => v.pid === action.payload);
    if  (index !== 0) {
      state.carting[index].qty ++;
    }else {
        state.carting.push({pid :action.payload , qty: 1})
    }
    
   }
  },
})

export const { addtocarting } = cartSlice.actions

export default cartSlice.reducer
