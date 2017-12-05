import React, {Component} from 'react';
import Screen from "./Screen";
import {NumericalBlock} from "./NumericalBlock";
import {CalculatorFooter} from "./CalculatorFooter";


export default class Container extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container">
                <span className="container-title"> #C </span>
                <Screen/>
                <NumericalBlock/>
                <CalculatorFooter />
            </div>
        )
    }
}
