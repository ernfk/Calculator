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
                #Container
                <Screen/>
                <NumericalBlock/>
                <CalculatorFooter />
            </div>
        )
    }
}