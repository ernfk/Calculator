// const expect = require('expect'); to.equal -> toEqual
import {calculate, verifyOperationSings} from "../../src/reducers/buttons";
import {prepareEquationToShow} from "../../src/components/Screen";
import {expect} from "../testing_helper";
import {beforeEach, describe, it} from "mocha/lib/mocha";


describe('Tests for chaining equation', () => {

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

    })
});