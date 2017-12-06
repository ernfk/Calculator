/*
Inspired and download from https://github.com/StephenGrider
 */


import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

// Set up testing environment to run like a browser in the command line. Fake DOM.
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jquery(global.window);

/**
 * Method renders mocked component for testing.
 * @param ComponentClass
 * @param props
 * @param state
 * @returns {*|jQuery|HTMLElement}
 */
function mockComponent(ComponentClass, props, state) {
    const componentInstance = TestUtils.renderIntoDocument(
        <Provider store={createStore(reducers, state)}>
            <ComponentClass {...props} />
        </Provider>
    );

    return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}

/**
 * Simulate behaviour (events).
 * @param eventName
 * @param value
 */
$.fn.simulate = function(eventName, value) {
    if (value) {
        this.val(value);
    }
    TestUtils.Simulate[eventName](this[0]);
};

chaiJquery(chai, chai.util, $);

export { mockComponent, expect };

