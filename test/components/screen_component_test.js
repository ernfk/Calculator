// const expect = require('expect'); to.equal -> toEqual
import {expect, mockComponent} from "../testing_helper"; // used
import {beforeEach, describe, it} from "mocha/lib/mocha";
import Screen from "../../src/components/Screen";

describe('REACT: Screen component renderer', () => {

    let component;

    beforeEach(() => {
        component = mockComponent(Screen);
    });

    it('Has an input with class name - screen', () => {
        expect(component.find('input')).to.have.class('screen');
    });
});
