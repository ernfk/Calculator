// const expect = require('expect'); to.equal -> toEqual
import {beforeEach, describe, it} from "mocha/lib/mocha";
import {expect, mockComponent} from "../testing_helper"; // used
import {buttonsReducer, formatDate} from "../../src/reducers/buttons";
import {
    selectBracketButton,
    selectCleanAllButton,
    selectCleanLastButton,
    selectDigitalButton, selectSquareButton, selectMemoryButton, selectMemoryCleanButton, selectMemoryReadButton,
    selectOperationButton,
    selectResultButton, selectRootButton
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
    let cleanAllAction;
    let cleanLastAction;
    let memoryAction;
    let memoryReadAction;
    let memoryCleanAction;

    let digitActionFive;
    let digitActionTwo;
    let digitActionThree;

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
        cleanAllAction = selectCleanAllButton('AC');
        cleanLastAction = selectCleanLastButton('C');
        memoryAction = selectMemoryButton('M+');
        memoryReadAction = selectMemoryReadButton('MR');
        memoryCleanAction = selectMemoryCleanButton('MC');

        digitActionFive = selectDigitalButton("5");
        digitActionTwo = selectDigitalButton("2");
        digitActionThree = selectDigitalButton("3");
    });

    it('Handling action with unknown type', () => {
        const action = {type: "I_DONT_EXIST", value: 'value'};
        expect(buttonsReducer([], action)).to.deep.equal(initialState);
    });

    it('Handling action: SELECT_DIGITAL_BUTTON', () => {
        expect(buttonsReducer(initialState, digitActionFive)).to.eql({
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

    it('Handling all actions: 5 + 2 = ,result should be: 7', () => {
        store.dispatch(digitActionFive);
        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [7],
            result: 7,
            alreadyCalculated: true,
            savedResults: [{
                date: formatDate(),
                equation: ["5", "+", "2"],
                result: 7
            }],
            memory: []
        });
    });

    it('Handling actions: 5 + - * 2 / + 3, should be: 13', () => {
        store.dispatch(digitActionFive);
        store.dispatch(additionAction);
        store.dispatch(subtractionAction);
        store.dispatch(multiplicationAction);
        store.dispatch(digitActionTwo);
        store.dispatch(divisionAction);
        store.dispatch(additionAction);
        store.dispatch(digitActionThree);
        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [13],
            result: 13,
            alreadyCalculated: true,
            savedResults: [{
                date: formatDate(),
                equation: ["5", "*", "2", "+", "3"],
                result: 13
            }],
            memory: []
        });
    });

    it('Handling action: SELECT_CLEAN_ALL_BUTTON', () => {
        store.dispatch(digitActionFive);
        store.dispatch(cleanAllAction);

        expect(store.getState().buttons).to.eql({
            equation: [],
            result: null,
            alreadyCalculated: false,
            savedResults: [],
            memory: []
        });

        store.dispatch(digitActionFive);

        expect(store.getState().buttons).to.eql({
            equation: ["5"],
            result: null,
            alreadyCalculated: false,
            savedResults: [],
            memory: []
        });
    });

    it('Handling action: SELECT_CLEAN_LAST_CHARACTER_BUTTON', () => {
        store.dispatch(digitActionFive); // 5
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
        const bracketActionTwo = selectBracketButton(")");

        store.dispatch(bracketAction);
        store.dispatch(digitActionFive);
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
        store.dispatch(digitActionFive);

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
        store.dispatch(digitActionFive);
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
        store.dispatch(digitActionFive);
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

        store.dispatch(digitActionFive);
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
        store.dispatch(digitActionFive);
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

        store.dispatch(digitActionFive);
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
        store.dispatch(digitActionFive);
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

        store.dispatch(digitActionFive);
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
        store.dispatch(digitActionFive);
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

    it('Handling action: SELECT_SQUARE_BUTTON', () => {
        store.dispatch(digitActionFive);
        store.dispatch(selectSquareButton('sqr'));

        expect(store.getState().buttons).to.eql({
            equation: [25],
            result: null,
            alreadyCalculated: false,
            savedResults: [],
            memory: []
        });

        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [27],
            result: 27,
            alreadyCalculated: true,
            savedResults: [
                {equation: [25, "+", "2"], date: formatDate(), result: 27},
            ],
            memory: []
        });

        store.dispatch(additionAction);
        store.dispatch(selectSquareButton('sqr'));

        expect(store.getState().buttons).to.eql({
            equation: [27, "+"],
            result: 27,
            alreadyCalculated: false,
            savedResults: [
                {equation: [25, "+", "2"], date: formatDate(), result: 27},
            ],
            memory: []
        });

        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(selectSquareButton('sqr'));

        expect(store.getState().buttons).to.eql({
            equation: [27, "+", 4],
            result: 27,
            alreadyCalculated: false,
            savedResults: [
                {equation: [25, "+", "2"], date: formatDate(), result: 27},
            ],
            memory: []
        });

        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [31],
            result: 31,
            alreadyCalculated: true,
            savedResults: [
                {equation: [25, "+", "2"], date: formatDate(), result: 27},
                {equation: [27, "+", 4], date: formatDate(), result: 31},
            ],
            memory: []
        });

        store.dispatch(additionAction);
        store.dispatch(digitActionTwo);
        store.dispatch(digitActionThree);
        store.dispatch(selectSquareButton('sqr'));

        expect(store.getState().buttons).to.eql({
            equation: [31, "+", 529],
            result: 31,
            alreadyCalculated: false,
            savedResults: [
                {equation: [25, "+", "2"], date: formatDate(), result: 27},
                {equation: [27, "+", 4], date: formatDate(), result: 31},
            ],
            memory: []
        });

        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [560],
            result: 560,
            alreadyCalculated: true,
            savedResults: [
                {equation: [25, "+", "2"], date: formatDate(), result: 27},
                {equation: [27, "+", 4], date: formatDate(), result: 31},
                {equation: [31, "+", 529], date: formatDate(), result: 560},
            ],
            memory: []
        });
    });

    it('Handling action: SELECT_ROOT_BUTTON', () => {
       store.dispatch(selectDigitalButton(16));
       store.dispatch(selectRootButton('root'));

        expect(store.getState().buttons).to.eql({
            equation: [4],
            result: null,
            alreadyCalculated: false,
            savedResults: [
            ],
            memory: []
        });

        store.dispatch(additionAction);
        store.dispatch(selectBracketButton("("));
        store.dispatch(selectDigitalButton(12));
        store.dispatch(multiplicationAction);
        store.dispatch(selectDigitalButton(12));
        store.dispatch(selectBracketButton(")"));
        store.dispatch(selectRootButton('root'));
        store.dispatch(resultAction);

        expect(store.getState().buttons).to.eql({
            equation: [16],
            result: 16,
            alreadyCalculated: true,
            savedResults: [
                {equation: [4, "+", 12], date: formatDate(), result: 16},
            ],
            memory: []
        });
    });
});