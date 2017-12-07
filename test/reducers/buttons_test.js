// const expect = require('expect'); to.equal -> toEqual
import {expect, mockComponent} from "../testing_helper"; // used
import {beforeEach, describe, it} from "mocha/lib/mocha";
import {buttonsReducer} from "../../src/reducers/buttons";
import {
    selectCleanAllButton, selectDigitalButton, selectOperationButton,
    selectResultButton
} from "../../src/actions/index";
import {createStore} from "redux";
import {rootReducer} from "../../src/reducers/index";

describe('Buttons reducer tests', () => {

    let initialState = [];
    let store = null;
    let additionAction;
    let subtractionAction;
    let multiplicationAction;
    let divisionAction;
    let resultAction;

    beforeEach(() => {
        initialState = {
            equation: [],
            result: null,
        };
        store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

        additionAction = selectOperationButton("+");
        subtractionAction = selectOperationButton("-");
        multiplicationAction = selectOperationButton("*");
        divisionAction = selectOperationButton("/");
        resultAction = selectResultButton("=");
    });

    it('Handling action with unknown type', () => {
        const action = {type: "I_DONT_EXIST", value: 'value'};
        expect(buttonsReducer([], action)).to.deep.equal(initialState);
    });

    it('Handling action: SELECT_DIGITAL_BUTTON', () => {
        const action = selectDigitalButton("5");
        expect(buttonsReducer(initialState, action)).to.eql({
            equation: ["5"],
            result: null,
        });
    });

    it('Handling action: SELECT_OPERATION_BUTTON', () => {
        expect(buttonsReducer(initialState, additionAction)).to.eql({
            equation: ["+"],
            result: null,
        });
    });

    it('Handling action: SELECT_RESULT_BUTTON', () => {
        expect(buttonsReducer(initialState, resultAction)).to.eql({
            equation: [],
            result: undefined,
        });
    });

    it('Handling all actions: 5 + 3 = ,result should be: 8', () => {
        const digitAction = selectDigitalButton("5");
        const digitActionTwo = selectDigitalButton("3");

        store.dispatch(digitAction);
        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: ["5", "+", "3"],
            result: 8
        });
    });

    it('Handling actions: 5 + - * 3 / + 2, should be: 17', () => {
        const digitAction = selectDigitalButton("5");
        const digitActionTwo = selectDigitalButton("3");
        const digitActionThree = selectDigitalButton("2");

        store.dispatch(digitAction);
        store.dispatch(additionAction);
        store.dispatch(subtractionAction);
        store.dispatch(multiplicationAction);
        store.dispatch(digitActionTwo);
        store.dispatch(divisionAction);
        store.dispatch(additionAction);
        store.dispatch(digitActionThree);
        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: ["5", "*", "3", "+", "2"],
            result: 17
        });
    });

    it('Handling action: SELECT_CLEAN_ALL_BUTTON', () => {
        const cleanAllAction = selectCleanAllButton('AC');
        const digitAction = selectDigitalButton("5");

        store.dispatch(digitAction);
        store.dispatch(cleanAllAction);

        expect(store.getState().buttons).to.eql({
            equation: [],
            result: null
        });

        store.dispatch(digitAction);

        expect(store.getState().buttons).to.eql({
            equation: ["5"],
            result: null
        });
    });


});