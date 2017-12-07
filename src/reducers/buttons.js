import {
    SELECT_CLEAN_ALL_BUTTON, SELECT_CLEAN_LAST_CHARACTER_BUTTON, SELECT_DIGITAL_BUTTON, SELECT_OPERATION_BUTTON,
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
        case SELECT_CLEAN_LAST_CHARACTER_BUTTON:
            return {...state, equation: deleteLastElement(state.equation, action.value)};
        default:
            return initialState;
    }
};

/**
 * Calculate equation from array elements.
 * @param equation
 * @returns {*}
 */
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

/**
 * Checks the array and return only elements:
 * 1) which aren't NaN
 * 2) element is NaN but his following element (index+1) is not NaN, otherwise the following is returned.
 * @param arrayToVerify
 */
export const verifyOperationSings = (arrayToVerify) => {
    return arrayToVerify.filter((currChar, index, arr) => {
        return index + 1 === arr.length || !(isNaN(currChar) && isNaN(arr[index + 1]));
    });
};

/**
 * Deletes last element from input array.
 * @param arrayToVerify
 */
export const deleteLastElement = (arrayToVerify) => {
    return arrayToVerify.slice(0, arrayToVerify.length - 1);
};