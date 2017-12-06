const expect = require('expect');
import {calculate} from "../src/reducers/buttons";
import {beforeEach} from "mocha";


describe('Tests for chaining equation', () => {

    let equation;
    let desiredEquation = '2 + 3 - 3.3 * 5 / 2';

    beforeEach(() => {
        equation = ["2", "+", "3", "-", "3.3", "*", "5", "/", "2"];
    });

    it('Correct init test', () => {
        const numbers = ["2", "+", "3", "-", "3.3", "*", "5", "/", "2"];
        expect(equation).toEqual(numbers);
    });

    it('Check and return numbers from array', () => {
        let numbers = equation.filter((element) => {
            return !isNaN(element);
        });
        expect(numbers.length).toEqual(5);
    });

    it('Return numbers and operation chars and chain it due to rule: 2 + 3 - 3.3 * 5 / 2', () => {
        let transformedEquation = equation
            .map(singleChar => singleChar + ' ')
            .join('')
            .trim();

        expect(transformedEquation).toEqual(desiredEquation);
    });

    describe('Calculate method', () => {
        it('Method calculates 2 + 3 - 3.3 * 5 / 2', () => {
            let result = calculate(equation);
            expect(result).toEqual(-3.25);
        });

        it('Method returns warning when input values are incorrect: 86*', () => {
            let equation = ["8", "6", "*"];
            let result = calculate(equation);
            expect(result).toEqual('Bad input!');
        });
    })
});