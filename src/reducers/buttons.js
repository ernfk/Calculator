import {
    SELECT_BRACKET_BUTTON,
    SELECT_CLEAN_ALL_BUTTON,
    SELECT_CLEAN_LAST_CHARACTER_BUTTON,
    SELECT_DIGITAL_BUTTON, SELECT_SQUARE_BUTTON, SELECT_MEMORY_BUTTON, SELECT_MEMORY_CLEAN_BUTTON,
    SELECT_MEMORY_READ_BUTTON,
    SELECT_OPERATION_BUTTON,
    SELECT_RESULT_BUTTON, SELECT_ROOT_BUTTON
} from "../actions/types";

export const initialState = {
    equation: [],
    result: null,
    alreadyCalculated: false,
    savedResults: [],
    memory: []
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
                equation: [calculate(state.equation)],
                savedResults: [...state.savedResults, getDateWithResult(state.equation)]
            };
        case SELECT_CLEAN_ALL_BUTTON:
            return {
                ...state,
                equation: [],
                result: null,
                alreadyCalculated: false
            };
        case SELECT_CLEAN_LAST_CHARACTER_BUTTON:
            return {...state, equation: deleteLastElement(state.equation, state.result)};
        case SELECT_BRACKET_BUTTON:
            return {
                ...state,
                equation: checkIfLastElementIsResultOrEmpty(state.equation, state.alreadyCalculated, action.value),
                alreadyCalculated: checkLastElement(state.equation, state.result)
            };
        case SELECT_MEMORY_BUTTON:
            return {
                ...state,
                memory: [state.result]
            };
        case SELECT_MEMORY_CLEAN_BUTTON:
            return {
                ...state,
                memory: []
            };
        case SELECT_MEMORY_READ_BUTTON:
            return {
                ...state,
                equation: [...state.equation, isMemoryEmpty(state.memory[0])]
            };
        case SELECT_SQUARE_BUTTON:
            return {
                ...state,
                result: mathPowerIfAlreadyCalculated(state.result, state.alreadyCalculated, 2),
                equation: mathPowerLastInput(state.equation, 2)
            };
        case SELECT_ROOT_BUTTON:
            return {
                ...state,
                result: rootIfAlreadyCalculated(state.result, state.alreadyCalculated),
                equation: mathPowerLastInput(state.equation, 0.5)
            };
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
    let lastElement = getLastElement(equation);

    return lastElement === ")" || lastElement === "(" ? toFilter : verifyOperationSings(toFilter);
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
    }
    return [...equationStateToVerify, newDigit];
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

/**
 * Returns last element of given array
 * @param arrayToVerify
 */
export const getLastElement = (arrayToVerify) => {
    return arrayToVerify.slice(arrayToVerify.length - 1, arrayToVerify.length)[0];
};

export const getDateWithResult = (equation) => {
    return {equation: equation, result: calculate(equation), date: formatDate()};
};


export const formatDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;


    let hour = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let seconds = date.getSeconds();
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
};

export const isMemoryEmpty = (memory) => {
    return memory === undefined ? "" : memory;
};

export const negativeNumberRootError = "ROOT FROM NEGATIVE NUMBER!";

export const mathPowerLastInput = (equation, index) => {
    if (index === 0.5 && equation.length > 1) {
        if (Number(equation.join('')) < 0) return [negativeNumberRootError];
    } else if (index === 2 && equation.length > 1) {
        if (Number(equation.join('')) < 0) return [Math.pow(Number(equation.join('')), index)];
    }

    if (equation[equation.length - 1] === ")" && equation.length > 1) {
        let reversedEquation = equation.slice().reverse();
        let indexOfLastLeftBracket = reversedEquation.findIndex(element => element === "(");
        let restOfArrayToConcat = reversedEquation.slice().splice(indexOfLastLeftBracket + 1, reversedEquation.length).reverse();
        let calculationToSquareOrRoot = reversedEquation.slice().splice(1, indexOfLastLeftBracket - 1).reverse();

        let valueToSquareRoot = calculate(calculationToSquareOrRoot);
        if (index === 0.5 && valueToSquareRoot < 0) {
            return [negativeNumberRootError];
        }

        let squaredOrRootValue = Math.pow(valueToSquareRoot, index);
        return restOfArrayToConcat.concat(squaredOrRootValue);
    }

    if (isNaN(equation[equation.length - 1]) && equation.length === 1) return equation[equation.length - 1];

    if (isNaN(equation[equation.length - 1]) && equation.length > 1) return equation;

    let reversedEquation = equation.slice().reverse();
    let indexOfLastOperationSign = reversedEquation.findIndex(element => isNaN(element));

    if (indexOfLastOperationSign !== -1) {
        let numberToSquareOrRoot = Number(reversedEquation.slice(0, indexOfLastOperationSign).reverse().join(''));

        if (index === 0.5 && numberToSquareOrRoot < 0) {
            return [negativeNumberRootError];
        }

        let mathPoweredNumber = Math.pow(numberToSquareOrRoot, index);
        return reversedEquation.slice(indexOfLastOperationSign).reverse().concat(mathPoweredNumber);
    }

    return [Math.pow(equation.join(''), index)];
};

export const mathPowerIfAlreadyCalculated = (result, isAlreadyCalculated, index) => {
    return isAlreadyCalculated ? Math.pow(result, index) : result;
};

export const rootIfAlreadyCalculated = (result, isAlreadyCalculated) => {
    if (result < 0 && isAlreadyCalculated) {
        return [negativeNumberRootError];
    }
    return result > 0 && isAlreadyCalculated ? Math.pow(result, 0.5) : result;
};