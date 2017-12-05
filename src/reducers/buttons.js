import {SELECT_DIGITAL_BUTTON, SELECT_OPERATION_BUTTON, SELECT_RESULT_BUTTON} from "../actions/types";

export const initialState = {
    equation: [],
    result: [],
};

export const buttonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_DIGITAL_BUTTON:
            return {...state, equation: [...state.equation, action.value]};
        case SELECT_OPERATION_BUTTON:
            return {...state, equation: [...state.equation, action.value]};
        case SELECT_RESULT_BUTTON:
            return {...state, result: [...state.result, action.value]};
        default:
            return initialState;
    }
};