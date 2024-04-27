import axios from 'axios';



import { ADD_PRODUCTS, DELETE_PRODUCTS, EDIT_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS } from '../ActionType';
import { baseURL } from '../../Utils/baseURL';



const loadingProducts = () => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS })
}

const errorProducts = (error) => async (dispatch) => {
    dispatch({ type: ERROR_PRODUCTS, payload: error })
}


export const getproducts = () => async (dispatch) => {
    try {
        dispatch(loadingProducts())
        await axios.get(baseURL + "fruits")
            .then((response) => {

                setTimeout(() => {
                    dispatch({ type: GET_PRODUCTS, payload: response.data })
                }, 2000);


            })
            .catch((error) => {

                dispatch(errorProducts(error.message))
            })
    } catch (error) {
        dispatch(errorProducts(error.message))
    }


}


export const addProducts = (data) => async (dispatch) => {
    try {
        dispatch(loadingProducts())
        await axios.post(baseURL + "fruits", data)
            .then((response) => {
                setTimeout(() => {
                    dispatch({ type: ADD_PRODUCTS, payload: response.data })
                }, 2000);
            })
            .catch((error) => dispatch(errorProducts(error.message)))
    } catch (error) {
        dispatch(errorProducts(error.message))
    }
}


export const deleteProducts = (id) => async (dispatch) => {
    try {
        dispatch(loadingProducts())
        await axios.delete(baseURL + "fruits/" + id)
            .then((response) => {

                setTimeout(() => {
                    dispatch({ type: DELETE_PRODUCTS, payload: id })
                }, 2000);
            })
            .catch((error) => dispatch(errorProducts(error.message)))
    } catch (error) {
        dispatch(errorProducts(error.message))
    }
}


export const editProducts = (data) => async (dispatch) => {
    try {
        dispatch(loadingProducts())
        await axios.put(baseURL + "fruits/" + data.id, data)
            .then((response) => {
                setTimeout(() => {
                    dispatch({ type: EDIT_PRODUCTS, payload: data })
                }, 2000);
            })
            .catch((error) => dispatch(errorProducts(error.message)))
    } catch (error) {
        dispatch(errorProducts(error.message))
    }
}



