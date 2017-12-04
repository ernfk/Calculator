import React, {Component} from 'react';
import Container from "./Container";

export class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1> Hello </h1>
                <div className="calculator-placement">
                    <Container/>
                </div>
            </div>

        )
    }
}