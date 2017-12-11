import {combineReducers} from "redux";
import {buttonsReducer} from "./buttons";


export const rootReducer = combineReducers({
    buttons: buttonsReducer,
});

export default rootReducer;