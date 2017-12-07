// const expect = require('expect'); to.equal -> toEqual
import {expect, mockComponent} from "../testing_helper"; // used
import {beforeEach, describe, it} from "mocha/lib/mocha";
import {NumericalBlock} from "../../src/components/NumericalBlock";

describe('REACT: Numerical block component tests', () => {

    let component;

    beforeEach(() => {
        component = mockComponent(NumericalBlock);
    });

    it('NumericalBlock has class name - numerical-block', () => {
        expect(component).to.have.class('numerical-block');
    });

    it('NumericalBlock has SingleButtonsRow', () => {
       expect(component.find('.single-row')).to.exist;
    });

});