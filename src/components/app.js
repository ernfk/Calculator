import React, {Component} from 'react';
import Container from "./Container";

export class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="calculator-placement">
                    <Container/>
                </div>
            </div>

        )
    }
}