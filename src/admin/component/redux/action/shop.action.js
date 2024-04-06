import axios from 'axios';

// import { GET_SHOP } from '../ActionType';
import { baseURL } from '../../../../utils/baseURL';
import { GET_FRUTES_DATA } from '../ActionType';






export const getshop = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "fruts")
            .then((response) => {

                dispatch({ type: GET_FRUTES_DATA, payload: response.data })


            })
            .catch((error) => {

                console.log(error);
            })
    } catch (error) {
        console.log(error);
    }


}