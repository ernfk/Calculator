import {
    SELECT_CLEAN_ALL_BUTTON, SELECT_DIGITAL_BUTTON, SELECT_OPERATION_BUTTON,
    SELECT_RESULT_BUTTON
} from "../actions/types";

export const initialState = {
    equation: [],
    result: null,
};

export const buttonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_DIGITAL_BUTTON:
            return {...state, equation: [...state.equation, action.value]};
        case SELECT_OPERATION_BUTTON:
            return {...state, equation: checkSings(state.equation, action.value)};
        case SELECT_RESULT_BUTTON:
            return {...state, result: calculate(state.equation)};
        case SELECT_CLEAN_ALL_BUTTON:
            return {
                equation: [],
                result: null,
            };
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

const checkSings = (equation, newValue) => {
    let toFilter = [...equation, newValue];
    return verifyOperationSings(toFilter);
};

export const verifyOperationSings = (arrayToVerify) => {
    return arrayToVerify.filter((currChar, index, arr) => {
        return index + 1 === arr.length || !(isNaN(currChar) && isNaN(arr[index + 1]));
    });
};