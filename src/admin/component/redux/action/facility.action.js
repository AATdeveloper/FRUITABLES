import { ADD_FACILITY, DELETE_DATA, GET_DATA, LOADING_FACILITY, UPDATE_DATA } from "../ActionType";



const handleLoading = (data) => (dispatch) => {
    dispatch({ type: LOADING_FACILITY, payload: data });
}

export const Facility_data = (data) => (dispatch) => {
    dispatch(handleLoading());
    setTimeout(() => {
        dispatch({ type: ADD_FACILITY, payload: data });
    },3000)
       
    }


    
export const Delete_facility = (data) => (dispatch) => {
    dispatch({ type: DELETE_DATA, payload: data });
}
export const Update_facility = (data) => (dispatch) => {
    dispatch({ type: UPDATE_DATA, payload: data });
}
export const GET_facility = () => (dispatch) => {
    dispatch({ type: GET_DATA });
}


