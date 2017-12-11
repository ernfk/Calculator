// const expect = require('expect'); to.equal -> toEqual
import {beforeEach, describe, it} from "mocha/lib/mocha";
import {expect, mockComponent} from "../testing_helper"; // used
import {buttonsReducer} from "../../src/reducers/buttons";
import {
    selectBracketButton,
    selectCleanAllButton,
    selectCleanLastButton,
    selectDigitalButton,
    selectOperationButton,
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
            alreadyCalculated: false,
            savedResults: []
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
            alreadyCalculated: false,
            savedResults: []
        });
    });

    it('Handling action: SELECT_OPERATION_BUTTON', () => {
        expect(buttonsReducer(initialState, additionAction)).to.eql({
            equation: ["+"],
            result: null,
            alreadyCalculated: false,
            savedResults: []
        });
    });

    it('Handling action: SELECT_RESULT_BUTTON', () => {
        expect(buttonsReducer(initialState, resultAction)).to.eql({
            equation: [undefined],
            result: undefined,
            alreadyCalculated: true,
            savedResults: [undefined]
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
            equation: [8],
            result: 8,
            alreadyCalculated: true,
            savedResults: [8]
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
            equation: [17],
            result: 17,
            alreadyCalculated: true,
            savedResults: [17]
        });
    });

    it('Handling action: SELECT_CLEAN_ALL_BUTTON', () => {
        const cleanAllAction = selectCleanAllButton('AC');
        const digitAction = selectDigitalButton("5");

        store.dispatch(digitAction);
        store.dispatch(cleanAllAction);

        expect(store.getState().buttons).to.eql({
            equation: [],
            result: null,
            alreadyCalculated: false,
            savedResults: []
        });

        store.dispatch(digitAction);

        expect(store.getState().buttons).to.eql({
            equation: ["5"],
            result: null,
            alreadyCalculated: false,
            savedResults: []
        });
    });

    it('Handling action: SELECT_CLEAN_LAST_CHARACTER_BUTTON', () => {
        const cleanLastAction = selectCleanLastButton('C');
        const digitAction = selectDigitalButton("5");

        store.dispatch(digitAction); // 5
        store.dispatch(additionAction); // +
        store.dispatch(cleanLastAction); // <=

        expect(store.getState().buttons).to.eql({
            equation: ["5"],
            result: null,
            alreadyCalculated: false,
            savedResults: []
        });

        store.dispatch(subtractionAction); // -

        expect(store.getState().buttons).to.eql({
            equation: ["5", "-"],
            result: null,
            alreadyCalculated: false,
            savedResults: []
        });

        store.dispatch(cleanLastAction); // <=
        store.dispatch(cleanLastAction); // <=

        expect(store.getState().buttons).to.eql({
            equation: [],
            result: null,
            alreadyCalculated: false,
            savedResults: []
        });
    });

    it('Handling action: SELECT_BRACKET_BUTTON', () => {
        const bracketAction = selectBracketButton("(");
        const digitAction = selectDigitalButton("5");
        const digitActionTwo = selectDigitalButton("2");
        const bracketActionTwo = selectBracketButton(")");

        store.dispatch(bracketAction);
        store.dispatch(digitAction);
        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(bracketActionTwo);

        expect(store.getState().buttons).to.eql({
            equation: ["(", "5", "+", "2", ")"],
            result: null,
            alreadyCalculated: false,
            savedResults: []
        });

        store.dispatch(multiplicationAction);
        store.dispatch(digitActionTwo);

        expect(store.getState().buttons).to.eql({
            equation: ["(", "5", "+", "2", ")", "*", "2"],
            result: null,
            alreadyCalculated: false,
            savedResults: []
        });

        store.dispatch(multiplicationAction);

        store.dispatch(divisionAction);
        store.dispatch(digitAction);

        expect(store.getState().buttons).to.eql({
            equation: ["(", "5", "+", "2", ")", "*", "2", "/", "5"],
            result: null,
            alreadyCalculated: false,
            savedResults: []
        });

        store.dispatch(additionAction);
        store.dispatch(bracketAction);
        store.dispatch(bracketAction);
        store.dispatch(bracketAction);
        store.dispatch(digitAction);
        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(bracketActionTwo);
        store.dispatch(bracketActionTwo);
        store.dispatch(bracketActionTwo);

        expect(store.getState().buttons).to.eql({
            equation: ["(", "5", "+", "2", ")", "*", "2", "/", "5", "+", "(", "(", "(", "5", "+", "2", ")", ")", ")"],
            result: null,
            alreadyCalculated: false,
            savedResults: []
        });

        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [9.8],
            result: 9.8,
            alreadyCalculated: true,
            savedResults: [9.8]
        });
    });

    it('Saves result to savesResults after couple of calculation', () => {
        const cleanAllAction = selectCleanAllButton('AC');
        const digitAction = selectDigitalButton("5");
        const digitActionTwo = selectDigitalButton("2");

        store.dispatch(digitAction);
        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [7],
            result: 7,
            alreadyCalculated: true,
            savedResults: [7]
        });

        store.dispatch(cleanAllAction);

        expect(store.getState().buttons).to.eql({
            equation: [],
            result: null,
            alreadyCalculated: false,
            savedResults: [7]
        });

        store.dispatch(digitAction);
        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [7],
            result: 7,
            alreadyCalculated: true,
            savedResults: [7, 7]
        });

        store.dispatch(cleanAllAction);

        expect(store.getState().buttons).to.eql({
            equation: [],
            result: null,
            alreadyCalculated: false,
            savedResults: [7, 7]
        });
    });

});