import {SELECT_DIGITAL_BUTTON} from "./types";

export const selectDigitalButton = (buttonValue) => {
  return {
      type: SELECT_DIGITAL_BUTTON,
      value: buttonValue
  }
};