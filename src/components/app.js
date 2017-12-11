import React, {Component} from 'react';
import Container from "./Container";
import History from "./History";


export class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="placement">
                <div className="calculator-placement">
                    <Container/>
                </div>
                <div className="history-container">
                    <History/>
                </div>
            </div>

        )
    }
}