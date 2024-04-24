import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../../../utils/baseURL";


const initialState = {
    isloading: false,
    coupen: [],
    error: null
}

export const addCoupen = createAsyncThunk(
    'coupen/add',
    async (data) => {
        console.log(data);
        await axios.post(baseURL + 'coupens', data)
        try {
            const response = await axios.post(baseURL + 'coupens', data);
            return response.data
        } catch (error) {
            return error.message
        }
    }
)
export const couponSlice = createSlice({
    name: "coupon",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCoupen.fulfilled, (state, action) => {
            console.log(action);
            state.coupen = state.coupen.concat(action.payload)

        })
    }
})


export default couponSlice.reducer