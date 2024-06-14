import axios from 'axios';
import { CATEGORIES_URL, baseURL } from '../../../../Utils/baseURL';
import { ADD_CATEGORY, GET_CATEGORY ,DELETE_CATEGORY,EDIT_CATEGORY,ERROR_CATEGORY} from '../ActionType';





export const setError = (error) => ({ type: ERROR_CATEGORY, payload: error });

export const getCategories = () => async (dispatch) => {
    try {
        const response = await axios.get(baseURL + 'categories/list-categories');
        dispatch({ type: GET_CATEGORY, payload: response.data });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const addCategory = (data) => async (dispatch) => {

    try {
        const response = await axios.post(baseURL + 'post_categories', data);
        dispatch({ type: ADD_CATEGORY, payload: response.data });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const deleteCategory = (id) => async (dispatch) => {

    try {
        await axios.delete(baseURL + 'delete_categories/' + id);
        dispatch({ type: DELETE_CATEGORY, payload: id });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const editCategory = (data) => async (dispatch) => {

    try {
        const response = await axios.put(baseURL + 'update_categories/' + data._id, data);
        dispatch({ type: EDIT_CATEGORY, payload: response.data });
    } catch (error) {
        dispatch(setError(error.message));
    }
};