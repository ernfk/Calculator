// const expect = require('expect'); to.equal -> toEqual
import {expect, mockComponent} from "../testing_helper"; // used
import {beforeEach, describe, it} from "mocha/lib/mocha";
import DigitalButton from "../../src/components/DigitalButton";

describe('REACT: Digital component tests', () => {

    let component;

    beforeEach(() => {
        component = mockComponent(DigitalButton);
    });

    it('DigitalButton has class name - digital-button', () => {
        expect(component).to.have.class('digital-button');
    });

    it('Has span with class name - button-value', () => {
        expect(component.find('span')).to.have.class('button-value');
    });

});

