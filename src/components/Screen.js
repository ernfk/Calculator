/**
 * Due to:
 * 1) result value
 * 2) alreadyCalculatedState - represents flag boolean:
 *      - true means we've already some result of calculation,
 *      - false - not yet.
 * determines which data should be rendered: equation before calculation or already calculated result.
 * @param result
 * @param alreadyCalculatedState
 * @param equationToShow
 * @returns {*}
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import * as PropTypes from "react/lib/ReactPropTypes";
import * as actions from "../actions/index";
import {negativeNumberRootError} from "../reducers/buttons";

let screenStyle = "screen";

export class Screen extends Component {
    constructor(props) {
        super(props);
    }

    onKeyPressedDown(event) {
        const {selectDigitalButton, selectOperationButton, selectResultButton, selectCleanAllButton, selectCleanLastButton, selectBracketButton} = this.props;
        let key = event.key;

        let keyType = validatePressedKey(event.key);
        switch (keyType) {
            case "digitKey":
                selectDigitalButton(key);
                break;
            case "operationKey":
                selectOperationButton(key);
                break;
            case "resultKey":
                selectResultButton(key);
                break;
            case "ACKey":
                selectCleanAllButton(key);
                break;
            case "CKey":
                selectCleanLastButton(key);
                break;
            case "bracketKey":
                selectBracketButton(key);
                break;
            case "dot": {
                selectOperationButton(".");
                break;
            }
            default:
                return;
                break;
        }
    }

    render() {
        const {equation, result, alreadyCalculated} = this.props;
        const equationToShow = prepareEquationToShow(equation);
        let showingData = null;

        if (result === 'Bad input!') screenStyle = "screen-error";
        if (Array.isArray(result) && result[0] === negativeNumberRootError) screenStyle = "negative-root-error";
        if (result === null) screenStyle = "screen";

        showingData = getDateToShow(result, alreadyCalculated, equationToShow);

        return (
            <div onKeyDown={this.onKeyPressedDown.bind(this)}>
                <input className={screenStyle} type="text" value={showingData} placeholder="0" id="inputFocus"/>
            </div>
        )
    }
}

Screen.propTypes = {
    equation: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        equation: state.buttons.equation,
        result: state.buttons.result,
        alreadyCalculated: state.buttons.alreadyCalculated
    }
};

export default connect(mapStateToProps, actions)(Screen);

export const prepareEquationToShow = (equation) => {
    return equation
        .map(singleChar => {
            if (isNaN(singleChar) && singleChar !== ".") singleChar = ' ' + singleChar + ' ';
            return singleChar;
        })
        .join('')
        .trim();
};

const getDateToShow = (result, alreadyCalculatedState, equationToShow) => {
    let showingData;

    if (result === null && alreadyCalculatedState === false) {
        showingData = equationToShow;
    } else if (result !== null && alreadyCalculatedState === true) {
        showingData = result;
    } else {
        showingData = equationToShow;
    }
    return showingData;
};

export const validatePressedKey = (pressedKey) => {
    let keyType;

    if (isDigit(pressedKey)) {
        keyType = "digitKey";
    } else if (isOperationKey(pressedKey)) {
        keyType = "operationKey";
    } else if (isResultKey(pressedKey)) {
        keyType = "resultKey";
    } else if (isACKey(pressedKey)) {
        keyType = "ACKey";
    } else if (isCKey(pressedKey)) {
        keyType = "CKey";
    } else if (isBracketKey(pressedKey)) {
        keyType = "bracketKey";
    } else if (pressedKey === ",") {
        keyType = "dot";
    } else {
        console.warn("Unknown key type: ", pressedKey);
    }
    return keyType;
};

const isDigit = (pressedKey) => {
    let digitsKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return isElementInArray(digitsKeys, pressedKey);
};

const isOperationKey = (pressedKey) => {
    let operationKeys = ["+", "-", ".", "/", "*"];
    return isElementInArray(operationKeys, pressedKey);
};

export const isResultKey = (pressedKey) => {
    let resultKey = "Enter";
    if (pressedKey === resultKey) return true;
};

export const isACKey = (pressedKey) => {
    let resultKey = "Escape";
    if (pressedKey === resultKey) return true;
};

export const isCKey = (pressedKey) => {
    let resultKey = "Backspace";
    if (pressedKey === resultKey) return true;
};

export const isBracketKey = (pressedKey) => {
    let bracketKeys = ["(", ")"];
    return isElementInArray(bracketKeys, pressedKey);
};

/**
 * Checks if given elements exists in given array.
 * @param array
 * @param elementToFind
 * @returns {boolean}
 */
export const isElementInArray = (array, elementToFind) => {
    let index = array.findIndex(element => element === elementToFind);
    return index !== -1;
};