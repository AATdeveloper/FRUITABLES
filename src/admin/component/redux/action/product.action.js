import axios from 'axios';
import { baseURL } from '../../../../utils/baseURL';
import Products from '../../../container/Products/Products';
import { type } from '@testing-library/user-event/dist/type';
import { ADD_PRODUCTS } from '../ActionType';

export const getProducts = () => (dispacth) => {
    try {
        axios.get(baseURL + "product")
        .then( (response) => {
            dispacth({type:ADD_PRODUCTS , payload : response.data}) 
          })
          .catch( (error) => {
            console.log(error);
          })
    } catch (error) {
        
    }
   
}