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
        try {
            const response = await axios.post(baseURL + 'coupens', data);
            return response.data
        } catch (error) {
            return error.message
        }
    }
)
export const couponSlice = createSlice({
    name: "coupen",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCoupen.fulfilled, (state, action) => {
            console.log(action);
            state.coupen = state.coupen.concat(action.payload)

        })
    }
})
export const getCoupen = createAsyncThunk(
    'coupen/get',
    async () => {
        try {
            const response = await axios.get(baseURL+ 'coupens')
            return response.data
        } catch (error) {
            return error.massage
        }
    }
) 

export const deleteCoupen = createAsyncThunk(
    'coupen/delete',
    async (id) => {
        
        try {
            const response = await axios.delete(baseURL + "coupens/" + id)
            return response.data.id
           
        } catch (error) {
            return error.massage
            
        }
    

    }
    
)

export const editCoupen = createAsyncThunk(
    'coupen/edit',
    async (data) => {
        console.log(data);
        try {
            const response = await axios.put(baseURL + "coupens/" + data.id, data)
            console.log(response.data);
            return response.data
        } catch (error) {
            return error.message
        }

    }
)

const coupenSlice = createSlice({
    name: "coupen",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCoupen.fulfilled, (state, action) => {
            console.log(action);
            state.coupen = state.coupen.concat(action.payload)
        })
        builder.addCase(getCoupen.fulfilled, (state, action) => {
            console.log(action);
            state.coupen = action.payload
        })
        builder.addCase(deleteCoupen.fulfilled, (state, action) => {
            
            console.log(action);
            state.coupen = state.coupen.filter((v) => v.id !== action.payload);
        })
        builder.addCase(editCoupen.fulfilled, (state, action) => {
            state.coupen = state.coupen.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v
                }
            })
        })

    },
});


export default coupenSlice.reducer