import {
    SELECT_DIGITAL_BUTTON, SELECT_CLEAN_ALL_BUTTON, SELECT_OPERATION_BUTTON, SELECT_RESULT_BUTTON,
    SELECT_CLEAN_LAST_CHARACTER_BUTTON
} from "./types";

export const selectDigitalButton = (buttonValue) => {
    return {
        type: SELECT_DIGITAL_BUTTON,
        value: buttonValue
    }
};

export const selectOperationButton = (buttonValue) => {
    return {
        type: SELECT_OPERATION_BUTTON,
        value: buttonValue
    }
};

export const selectResultButton = (buttonValue) => {
    return {
        type: SELECT_RESULT_BUTTON,
        value: buttonValue
    }
};

export const selectCleanAllButton = (buttonValue) => {
    return {
        type: SELECT_CLEAN_ALL_BUTTON,
        value: buttonValue
    }
};

export const selectCleanLastButton = (buttonValue) => {
    return {
        type: SELECT_CLEAN_LAST_CHARACTER_BUTTON,
        value: buttonValue
    }
};