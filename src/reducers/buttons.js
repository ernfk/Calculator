/**
 * Calculate equation from array elements.
 * @param equation
 * @returns {*}
 */
import {
    SELECT_BRACKET_BUTTON,
    SELECT_CLEAN_ALL_BUTTON, SELECT_CLEAN_LAST_CHARACTER_BUTTON, SELECT_DIGITAL_BUTTON, SELECT_OPERATION_BUTTON,
    SELECT_RESULT_BUTTON
} from "../actions/types";

export const initialState = {
    equation: [],
    result: null,
    alreadyCalculated: false,
};

export const buttonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_DIGITAL_BUTTON:
            return {
                ...state,
                equation: checkIfLastElementIsResultOrEmpty(state.equation, state.alreadyCalculated, action.value),
                alreadyCalculated: checkLastElement(state.equation, state.result)
            };
        case SELECT_OPERATION_BUTTON:
            return {...state, equation: checkSings(state.equation, action.value), alreadyCalculated: false};
        case SELECT_RESULT_BUTTON:
            return {
                ...state,
                result: calculate(state.equation),
                alreadyCalculated: true,
                equation: [calculate(state.equation)]
            };
        case SELECT_CLEAN_ALL_BUTTON:
            return {
                equation: [],
                result: null,
            };
        case SELECT_CLEAN_LAST_CHARACTER_BUTTON:
            return {...state, equation: deleteLastElement(state.equation, state.result)};
        case SELECT_BRACKET_BUTTON:
            return {
                ...state,
                equation: checkIfLastElementIsResultOrEmpty(state.equation, state.alreadyCalculated, action.value),
                alreadyCalculated: checkLastElement(state.equation, state.result)
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
    let lastElement = getLastElement(equation);

    if (lastElement === ")" || lastElement === "(") {
        return toFilter;
    } else {
        return verifyOperationSings(toFilter);
    }
};

/**
 * Checks the array and return only elements:
 * 1) which aren't NaN
 * 2) element is NaN but his following element (index+1) is not NaN, otherwise the following is returned.
 * @param arrayToVerify
 */
export const verifyOperationSings = (arrayToVerify) => {
    return arrayToVerify.filter((currChar, index, arr) => {
        if (currChar === ")" || currChar === "(") return currChar;
        if (isNaN(currChar) && (arr[index + 1] === "(" || arr[index + 1] === ")")) return currChar;
        return index + 1 === arr.length || !(isNaN(currChar) && isNaN(arr[index + 1]));
    });
};

/**
 * Deletes last element from input array.
 * @param arrayToVerify
 * @param alreadyResult
 */
export const deleteLastElement = (arrayToVerify, alreadyResult) => {
    let lastElement = getLastElement(arrayToVerify);
    if (lastElement === alreadyResult) return arrayToVerify;
    return arrayToVerify.slice(0, arrayToVerify.length - 1);
};

/**
 * Checks if last is result or is empty string. If so, return another empty string.
 * This is mechanism to avoid changing already existing result by clicking new digit buttons.
 * @param equationStateToVerify
 * @param alreadyCalculatedState
 * @param newDigit
 * @returns {*}
 */
export const checkIfLastElementIsResultOrEmpty = (equationStateToVerify, alreadyCalculatedState, newDigit) => {
    let lastElement = equationStateToVerify.slice(equationStateToVerify.length - 1, equationStateToVerify.length);

    if (alreadyCalculatedState === true || lastElement === "") {
        return [...equationStateToVerify, ""];
    } else {
        return [...equationStateToVerify, newDigit];
    }
};

/**
 * Checks last element of equation state. If it's empty or it represents already calculated result it return true.
 * Second part of mechanism to avoid changing already existing result by clicking new digit buttons.
 * @param equationStateToVerify
 * @param alreadyResult
 * @returns {boolean}
 */
export const checkLastElement = (equationStateToVerify, alreadyResult) => {
    let lastElement = getLastElement(equationStateToVerify);
    return lastElement === "" || lastElement === alreadyResult;
};

export const getLastElement = (arrayToVerify) => {
    return arrayToVerify.slice(arrayToVerify.length - 1, arrayToVerify.length)[0];
};