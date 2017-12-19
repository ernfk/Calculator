// const expect = require('expect'); to.equal -> toEqual
import {beforeEach, describe, it} from "mocha/lib/mocha";
import {expect, mockComponent} from "../testing_helper"; // used
import {buttonsReducer, formatDate} from "../../src/reducers/buttons";
import {
    selectBracketButton,
    selectCleanAllButton,
    selectCleanLastButton,
    selectDigitalButton, selectMemoryButton, selectMemoryCleanButton, selectMemoryReadButton,
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
            savedResults: [],
            memory: []
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
            savedResults: [],
            memory: []
        });
    });

    it('Handling action: SELECT_OPERATION_BUTTON', () => {
        expect(buttonsReducer(initialState, additionAction)).to.eql({
            equation: ["+"],
            result: null,
            alreadyCalculated: false,
            savedResults: [],
            memory: []
        });
    });

    it('Handling action: SELECT_RESULT_BUTTON', () => {
        expect(buttonsReducer(initialState, resultAction)).to.eql({
            equation: [undefined],
            result: undefined,
            alreadyCalculated: true,
            savedResults: [{
                date: formatDate(),
                equation: [],
                result: undefined
            }],
            memory: []
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
            savedResults: [{
                date: formatDate(),
                equation: ["5", "+", "3"],
                result: 8
            }],
            memory: []
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
            savedResults: [{
                date: formatDate(),
                equation: ["5", "*", "3", "+", "2"],
                result: 17
            }],
            memory: []
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
            savedResults: [],
            memory: []
        });

        store.dispatch(digitAction);

        expect(store.getState().buttons).to.eql({
            equation: ["5"],
            result: null,
            alreadyCalculated: false,
            savedResults: [],
            memory: []
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
            savedResults: [],
            memory: []
        });

        store.dispatch(subtractionAction); // -

        expect(store.getState().buttons).to.eql({
            equation: ["5", "-"],
            result: null,
            alreadyCalculated: false,
            savedResults: [],
            memory: []
        });

        store.dispatch(cleanLastAction); // <=
        store.dispatch(cleanLastAction); // <=

        expect(store.getState().buttons).to.eql({
            equation: [],
            result: null,
            alreadyCalculated: false,
            savedResults: [],
            memory: []
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
            savedResults: [],
            memory: []
        });

        store.dispatch(multiplicationAction);
        store.dispatch(digitActionTwo);

        expect(store.getState().buttons).to.eql({
            equation: ["(", "5", "+", "2", ")", "*", "2"],
            result: null,
            alreadyCalculated: false,
            savedResults: [],
            memory: []
        });

        store.dispatch(multiplicationAction);

        store.dispatch(divisionAction);
        store.dispatch(digitAction);

        expect(store.getState().buttons).to.eql({
            equation: ["(", "5", "+", "2", ")", "*", "2", "/", "5"],
            result: null,
            alreadyCalculated: false,
            savedResults: [],
            memory: []
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
            savedResults: [],
            memory: []
        });

        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [9.8],
            result: 9.8,
            alreadyCalculated: true,
            savedResults: [{
                equation: ["(", "5", "+", "2", ")", "*", "2", "/", "5", "+", "(", "(", "(", "5", "+", "2", ")", ")", ")"],
                date: formatDate(),
                result: 9.8
            }],
            memory: []
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
            savedResults: [{
                equation: ["5", "+", "2"],
                date: formatDate(),
                result: 7
            }],
            memory: []
        });

        store.dispatch(cleanAllAction);

        expect(store.getState().buttons).to.eql({
            equation: [],
            result: null,
            alreadyCalculated: false,
            savedResults: [{
                equation: ["5", "+", "2"],
                date: formatDate(),
                result: 7
            }],
            memory: []
        });

        store.dispatch(digitAction);
        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [7],
            result: 7,
            alreadyCalculated: true,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
                {equation: ["5", "+", "2"], date: formatDate(), result: 7}
            ],
            memory: []
        });

        store.dispatch(cleanAllAction);

        expect(store.getState().buttons).to.eql({
            equation: [],
            result: null,
            alreadyCalculated: false,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
                {equation: ["5", "+", "2"], date: formatDate(), result: 7}
            ],
            memory: []
        });
    });

    it('Handling action: SELECT_MEMORY_BUTTON', () => {
        const memoryAction = selectMemoryButton('M+');
        const digitAction = selectDigitalButton("5");
        const digitActionTwo = selectDigitalButton("2");
        const digitActionThree = selectDigitalButton("3");
        const cleanAllAction = selectCleanAllButton('AC');

        store.dispatch(digitAction);
        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(resultAction);
        store.dispatch(memoryAction);

        expect(store.getState().buttons).to.eql({
            equation: [7],
            result: 7,
            alreadyCalculated: true,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
            ],
            memory: [7]
        });

        store.dispatch(cleanAllAction);

        expect(store.getState().buttons).to.eql({
            equation: [],
            result: null,
            alreadyCalculated: false,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
            ],
            memory: [7]
        });

        store.dispatch(digitAction);
        store.dispatch(multiplicationAction);
        store.dispatch(digitActionThree);
        store.dispatch(resultAction);
        store.dispatch(memoryAction);

        expect(store.getState().buttons).to.eql({
            equation: [15],
            result: 15,
            alreadyCalculated: true,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
                {equation: ["5", "*", "3"], date: formatDate(), result: 15},
            ],
            memory: [15]
        });
    });

    it('Handling action: SELECT_MEMORY_CLEAN_BUTTON', () => {
        const memoryAction = selectMemoryButton('M+');
        const memoryCleanAction = selectMemoryCleanButton('MC');
        const digitAction = selectDigitalButton("5");
        const digitActionTwo = selectDigitalButton("2");
        const digitActionThree = selectDigitalButton("3");
        const cleanAllAction = selectCleanAllButton('AC');

        store.dispatch(digitAction);
        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(resultAction);
        store.dispatch(memoryAction);

        expect(store.getState().buttons).to.eql({
            equation: [7],
            result: 7,
            alreadyCalculated: true,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
            ],
            memory: [7]
        });

        store.dispatch(memoryCleanAction);

        expect(store.getState().buttons).to.eql({
            equation: [7],
            result: 7,
            alreadyCalculated: true,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
            ],
            memory: []
        });

        store.dispatch(cleanAllAction);

        store.dispatch(digitAction);
        store.dispatch(multiplicationAction);
        store.dispatch(digitActionThree);
        store.dispatch(resultAction);
        store.dispatch(memoryAction);

        expect(store.getState().buttons).to.eql({
            equation: [15],
            result: 15,
            alreadyCalculated: true,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
                {equation: ["5", "*", "3"], date: formatDate(), result: 15},
            ],
            memory: [15]
        });
    });

    it('Handling action: SELECT_MEMORY_READ_BUTTON', () => {
        const memoryAction = selectMemoryButton('M+');
        const memoryReadAction = selectMemoryReadButton('MR');
        const memoryCleanAction = selectMemoryCleanButton('MC');
        const digitAction = selectDigitalButton("5");
        const digitActionTwo = selectDigitalButton("2");
        const digitActionThree = selectDigitalButton("3");
        const cleanAllAction = selectCleanAllButton('AC');

        store.dispatch(digitAction);
        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(resultAction);
        store.dispatch(memoryAction);

        expect(store.getState().buttons).to.eql({
            equation: [7],
            result: 7,
            alreadyCalculated: true,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
            ],
            memory: [7]
        });

        store.dispatch(additionAction);
        store.dispatch(memoryReadAction);
        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [14],
            result: 14,
            alreadyCalculated: true,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
                {equation: [7, "+", 7], date: formatDate(), result: 14},
            ],
            memory: [7]
        });

        store.dispatch(memoryAction);

        expect(store.getState().buttons).to.eql({
            equation: [14],
            result: 14,
            alreadyCalculated: true,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
                {equation: [7, "+", 7], date: formatDate(), result: 14},
            ],
            memory: [14]
        });

        store.dispatch(multiplicationAction);
        store.dispatch(digitActionThree);
        store.dispatch(multiplicationAction);
        store.dispatch(memoryReadAction);
        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [588],
            result: 588,
            alreadyCalculated: true,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
                {equation: [7, "+", 7], date: formatDate(), result: 14},
                {equation: [14, "*", "3", "*", 14], date: formatDate(), result: 588},
            ],
            memory: [14]
        });

        store.dispatch(cleanAllAction);

        expect(store.getState().buttons).to.eql({
            equation: [],
            result: null,
            alreadyCalculated: false,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
                {equation: [7, "+", 7], date: formatDate(), result: 14},
                {equation: [14, "*", "3", "*", 14], date: formatDate(), result: 588},
            ],
            memory: [14]
        });

        store.dispatch(memoryCleanAction);
        store.dispatch(additionAction);
        store.dispatch(memoryReadAction);

        expect(store.getState().buttons).to.eql({
            equation: ["+", ""],
            result: null,
            alreadyCalculated: false,
            savedResults: [
                {equation: ["5", "+", "2"], date: formatDate(), result: 7},
                {equation: [7, "+", 7], date: formatDate(), result: 14},
                {equation: [14, "*", "3", "*", 14], date: formatDate(), result: 588},
            ],
            memory: []
        });
    });
});