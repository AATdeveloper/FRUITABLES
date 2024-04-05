import { ADD_FACILITY, DELETE_DATA, GET_DATA, UPDATE_DATA } from "../ActionType";

export
    const Facility_data = (data) => (dispacth) => {
        dispacth({ type: ADD_FACILITY, payload: data });
    }
export const Delete_facility = (data) => (dispacth) => {
    dispacth({ type: DELETE_DATA, payload: data });
}
export const Update_facility = (data) => (dispacth) => {
    dispacth({ type: UPDATE_DATA, payload: data });
}
export const GET_facility = () => (dispacth) => {
    dispacth({ type: GET_DATA });
}