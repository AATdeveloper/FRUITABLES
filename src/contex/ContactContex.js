import { createContext, useReducer } from "react";
import { Contactreducer } from "./reducer/contact.reducer";
import axios from "axios";
import { baseURL } from "../Utils/baseURL";
import { ADD_CONTACT } from "./ActionTypes";

const initialState = {
    isLoading: false,
    contact: [],
    Error: false,

};

export const ContactContex = createContext();



export const ContactProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Contactreducer, initialState);
    const addContact = async (data) => {
        try {
            const response = await axios.post(baseURL + "contacts", data)
            dispatch({ type: ADD_CONTACT, payload: response.data })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <ContactContex.Provider
            value={{
                ...state,
                addContact

            }}
        >
            {children}
        </ContactContex.Provider>
    )
}


