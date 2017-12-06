import {SELECT_DIGITAL_BUTTON, SELECT_OPERATION_BUTTON, SELECT_RESULT_BUTTON} from "../actions/types";

export const initialState = {
    equation: [],
    result: null,
};

export const buttonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_DIGITAL_BUTTON:
            return {...state, equation: [...state.equation, action.value]};
        case SELECT_OPERATION_BUTTON:
            return {...state, equation: [...state.equation, action.value]};
        case SELECT_RESULT_BUTTON:
            return {...state, result: calculate(state.equation)};
        default:
            return initialState;
    }
};

export const calculate = (equation) => {
    let result;
    try {
        result = eval(equation.join(''));
    } catch (err) {
        result = 'Bad input!';
    }

    return result;
};