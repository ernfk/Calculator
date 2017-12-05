import {SELECT_DIGITAL_BUTTON} from "../actions/types";

export const buttonsReducer = (state = [], action) => {
    switch (action.type) {
        case SELECT_DIGITAL_BUTTON:
            return [...state, action.value];
        default:
            return state;
    }
};