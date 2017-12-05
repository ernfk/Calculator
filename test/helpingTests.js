const expect = require('expect');


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
});