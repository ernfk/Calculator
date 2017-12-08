// const expect = require('expect'); to.equal -> toEqual
import {expect, mockComponent} from "../testing_helper"; // used
import {beforeEach, describe, it} from "mocha/lib/mocha";
import {
    selectDigitalButton, selectCleanAllButton, selectOperationButton,
    selectResultButton, selectCleanLastButton, selectBracketButton
} from "../../src/actions/index";
import {
    SELECT_BRACKET_BUTTON,
    SELECT_CLEAN_ALL_BUTTON, SELECT_CLEAN_LAST_CHARACTER_BUTTON, SELECT_DIGITAL_BUTTON, SELECT_OPERATION_BUTTON,
    SELECT_RESULT_BUTTON
} from "../../src/actions/types";


describe('Actions tests', () => {
    describe('Action: selectDigitalButton', () => {
        it('Has the correct type', () => {
            const action = selectDigitalButton();
            expect(action.type).to.equal(SELECT_DIGITAL_BUTTON);
        });

        it('Has the correct button value', () => {
            const action = selectDigitalButton('5');
            expect(action.value).to.equal('5');
        });
    });

    describe('Action: selectOperationButton', () => {
        it('Has the correct type', () => {
            const action = selectOperationButton();
            expect(action.type).to.equal(SELECT_OPERATION_BUTTON);
        });

        it('Has the correct button value', () => {
            const action = selectOperationButton('+');
            expect(action.value).to.equal('+');
        });
    });

    describe('Action: selectResultButton', () => {
        it('Has the correct type', () => {
            const action = selectResultButton();
            expect(action.type).to.equal(SELECT_RESULT_BUTTON);
        });

        it('Has the correct button value', () => {
            const action = selectResultButton('=');
            expect(action.value).to.equal('=');
        });
    });

    describe('Action: selectCleanAllButton', () => {
        it('Has the correct type', () => {
            const action = selectCleanAllButton();
            expect(action.type).to.equal(SELECT_CLEAN_ALL_BUTTON);
        });

        it('Has the correct button value', () => {
            const action = selectCleanAllButton('CA');
            expect(action.value).to.equal('CA')
        })
    });

    describe('Action: selectCleanLastButton', () => {
        it('Has the correct type', () => {
            const action = selectCleanLastButton();
            expect(action.type).to.equal(SELECT_CLEAN_LAST_CHARACTER_BUTTON);
        });

        it('Has the correct button value', () => {
            const action = selectCleanLastButton('C');
            expect(action.value).to.equal('C')
        });
    });

    describe('Action: selectBracketButton', () => {
        it('Has the correct type', () => {
            const action = selectBracketButton();
            expect(action.type).to.equal(SELECT_BRACKET_BUTTON);
        });

        it('Has the correct button value', () => {
            const action = selectBracketButton('(');
            expect(action.value).to.equal('(');

            const actionTwo = selectBracketButton(')');
            expect(actionTwo.value).to.equal(')')
        });
    });
});
