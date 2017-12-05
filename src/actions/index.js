import {SELECT_DIGITAL_BUTTON, SELECT_OPERATION_BUTTON, SELECT_RESULT_BUTTON} from "./types";

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