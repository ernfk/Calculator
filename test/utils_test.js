// const expect = require('expect'); to.equal -> toEqual
import {expect, mockComponent} from "./testing_helper"; // used
import {beforeEach, describe, it} from "mocha/lib/mocha";
import {isElementInArray, prepareEquationToShow, validatePressedKey} from "../src/components/Screen";
import {
    buttonsReducer, calculate, deleteLastElement, getLastElement,
    verifyOperationSings, formatDate, mathPowerLastInput
} from "../src/reducers/buttons";
import {rootReducer} from "../src/reducers/index";
import {createStore} from "redux";
import {
    selectCleanAllButton, selectCleanLastButton, selectDigitalButton,
    selectResultButton
} from "../src/actions/index";


describe('Tests for chaining equation. ', () => {

    let equation;
    let desiredEquation;

    beforeEach(() => {
        equation = ["2", "+", "3", "-", "3.3", "*", "5", "/", "2"];
        desiredEquation = '2 + 3 - 3.3 * 5 / 2';
    });

    it('Correct init test', () => {
        const numbers = ["2", "+", "3", "-", "3.3", "*", "5", "/", "2"];
        expect(equation).to.deep.equal(numbers);
    });

    it('Check and return numbers from array', () => {
        let numbers = equation.filter((element) => {
            return !isNaN(element);
        });
        expect(numbers.length).to.deep.equal(5);
    });

    it('Return numbers and operation chars and chain it due to rule: 2 + 3 - 3.3 * 5 / 2', () => {
        let transformedEquation = equation
            .map(singleChar => singleChar + ' ')
            .join('')
            .trim();

        expect(transformedEquation).to.deep.equal(desiredEquation);
    });

    describe('PrepareEquationToShow method', () => {

        it('Return numbers and operation and chain it due to rule: 303 + 1.5 - prepareEquationToShow()', () => {
            equation = ["3", "0", "3", "+", "1", ".", "5"];
            desiredEquation = "303 + 1.5";
            let transformedEquation = prepareEquationToShow(equation);

            expect(transformedEquation).to.deep.equal(desiredEquation);
        });

        it('Return numbers and operation and chain it due to rule: 303 + 1.5 - 4.1 * 7 / 2.3 - prepareEquationToShow()', () => {
            equation = ["3", "0", "3", "+", "1", ".", "5", "-", "4", ".", "1", "*", "7", "/", "2", ".", "3"];
            desiredEquation = "303 + 1.5 - 4.1 * 7 / 2.3";
            let transformedEquation = prepareEquationToShow(equation);

            expect(transformedEquation).to.deep.equal(desiredEquation);
        });

    });


    describe('Calculate method', () => {
        it('Method calculates 2 + 3 - 3.3 * 5 / 2', () => {
            let result = calculate(equation);
            expect(result).to.deep.equal(-3.25);
        });

        it('Method returns warning when input values are incorrect: 86*', () => {
            equation = ["8", "6", "*"];
            let result = calculate(equation);
            expect(result).to.deep.equal('Bad input!');
        });


    });

    describe('Verifying operation signs method', () => {
        it('If two operation signs are selected one after one, delete previous: 2.2 + - 3 => 2.2 - 3, verifyOperationSings()', () => {
            equation = ["2", ".", "2", "+", "-", "3"];
            desiredEquation = ["2", ".", "2", "-", "3"];

            let filteredEquation = verifyOperationSings(equation);

            expect(filteredEquation).to.deep.equal(desiredEquation);
        });

        it('If three operation signs are selected one after one, delete previous: 2.2 * + - 3 => 2.2 - 3, verifyOperationSings()', () => {
            equation = ["2", ".", "2", "*", "+", "-", "3"];
            desiredEquation = ["2", ".", "2", "-", "3"];

            let filteredEquation = verifyOperationSings(equation);

            expect(filteredEquation).to.deep.equal(desiredEquation);
        });

        it('If three operation signs are selected one after one, delete previous: 2.2 * + - 3 * - => 2.2 - 3 -, verifyOperationSings()', () => {
            equation = ["2", ".", "2", "*", "+", "-", "3", "*", "-"];
            desiredEquation = ["2", ".", "2", "-", "3", "-"];

            let filteredEquation = verifyOperationSings(equation);

            expect(filteredEquation).to.deep.equal(desiredEquation);
        });

        it('If one operation sign, shouldnt be deleted : 2+ => 2+, verifyOperationSings()', () => {
            equation = ["2", "+"];
            desiredEquation = ["2", "+"];

            let filteredEquation = verifyOperationSings(equation);

            expect(filteredEquation).to.deep.equal(desiredEquation);
        });
    });

    describe('Deleting last input character method', () => {
        it('Delete last element from array - deleteLastElement()', () => {
            let arr = ["5", "-", "3", "+"];
            let desiredArr = ["5", "-", "3"];

            expect(deleteLastElement(arr)).to.deep.equal(desiredArr);
        });
    });

    describe('Validates pressed key', () => {

        let initialState;
        let store;

        beforeEach(() => {
            initialState = {
                equation: [],
                result: null,
                alreadyCalculated: false,
                savedResults: []
            };
            store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
        });

        it('Checks if pressed key ("9") belongs to allowed keys to press and if the state is changed', () => {
            let keyPressed = "9";
            const digitAction = selectDigitalButton(keyPressed);

            expect(validatePressedKey(keyPressed)).to.deep.equal("digitKey");

            store.dispatch(digitAction);

            expect(buttonsReducer(initialState, digitAction)).to.eql({
                equation: [keyPressed],
                result: null,
                alreadyCalculated: false,
                savedResults: []
            });
        });

        it('Checks if pressed keys ("Enter" && "9") belong to allowed keys to press and if the state is changed', () => {
            let resultButtonPressed = "Enter";
            let digitPressed = "9";
            const resultAction = selectResultButton(resultButtonPressed);
            const digitAction = selectDigitalButton(digitPressed);

            expect(validatePressedKey(resultButtonPressed)).to.deep.equal("resultKey");

            store.dispatch(digitAction);
            store.dispatch(resultAction);

            expect(store.getState().buttons).to.eql({
                equation: [Number(digitPressed)],
                result: Number(digitPressed),
                alreadyCalculated: true,
                savedResults: [{
                    equation: ["9"],
                    date: formatDate(),
                    result: Number(digitPressed)
                }],
                memory: []
            });
        });

        it('Checks if pressed keys ("Backspace" && "9" && "Escape") belong to allowed keys to press and if the state is changed', () => {
            let resultButtonPressed = "Enter";
            let CKeyPressed = "Backspace";
            let ACKeyPressed = "Escape";
            let digitPressed = "9";
            let digitPressedTwo = "10";
            let digitPressedThree = "11";

            const resultAction = selectResultButton(resultButtonPressed);
            const cleanLastAction = selectCleanLastButton(CKeyPressed);
            const cleanAllAction = selectCleanAllButton(ACKeyPressed);
            const digitAction = selectDigitalButton(digitPressed);
            const digitActionTwo = selectDigitalButton(digitPressedTwo);
            const digitActionThree = selectDigitalButton(digitPressedThree);

            expect(validatePressedKey(CKeyPressed)).to.deep.equal("CKey");
            expect(validatePressedKey(ACKeyPressed)).to.deep.equal("ACKey");

            store.dispatch(digitAction);
            store.dispatch(digitActionTwo);
            store.dispatch(digitActionThree);
            store.dispatch(cleanLastAction);
            store.dispatch(resultAction);

            expect(store.getState().buttons).to.eql({
                equation: [910],
                result: 910,
                alreadyCalculated: true,
                savedResults: [{
                    equation: ["9", "10"],
                    date: formatDate(),
                    result: 910
                }],
                memory: []
            });

            store.dispatch(digitAction);
            store.dispatch(digitActionTwo);
            store.dispatch(cleanAllAction);

            expect(store.getState().buttons).to.eql({
                equation: [],
                result: null,
                alreadyCalculated: false,
                savedResults: [{
                    equation: ["9", "10"],
                    date: formatDate(),
                    result: 910
                }],
                memory: []
            });
        });
    });

    describe('Gets last element from given array method', () => {
        it('getLastElement() from [1, 2, 3, "4"] - "4"', () => {
            let arr = [1, 2, 3, "4"];
            expect(getLastElement(arr)).to.eql("4");
        });
    });

    describe('Search element in given array method', () => {
        it('isElementInArray() "cat" from [1, "dog", 2, "3", "cat"]', () => {
            let arr = [1, "dog", 2, "3", "cat"];
            expect(isElementInArray(arr, "cat")).to.be.true;
            expect(isElementInArray(arr, "mouse")).to.be.false;
        });
    });

    describe('Check last element and if it is the digit, return square of it', () => {
        it('mathPowerLastInput() where last input element is 5', () => {
            let squareNumber = mathPowerLastInput("5");
            expect(squareNumber).to.equal(25);
        });

        it('mathPowerLastInput() where last input element is not a digit, should return ""', () => {
            let squareNumber = mathPowerLastInput("+");
            expect(squareNumber).to.equal("");
        });
    });
});
