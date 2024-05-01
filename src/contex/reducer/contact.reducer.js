import { ADD_CONTACT } from "../ActionTypes";

 export const Contactreducer = ( state ,action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                isLoading:false,
                contact: state.contact.concat(action.payload),
                error:null
            }
    
        default:
            return state;
   
 } 
}