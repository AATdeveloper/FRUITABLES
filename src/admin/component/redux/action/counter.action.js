import { INCREMENT_COUNTER } from "../ActionType";

export const
    increment = () => (dispacth) => {
        dispacth({ type: INCREMENT_COUNTER });
    }