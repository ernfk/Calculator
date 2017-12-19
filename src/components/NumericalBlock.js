import React, {Component} from "react";
import {SingleButtonsRow} from "./SingleButtonsRow";


export class NumericalBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="numerical-block">
                <SingleButtonsRow digitalButtonsPerRow={[]}
                                  operationButtonsPerRow={["AC", "C", "(", ")", "M+"]}
                                  rowKey={40}
                                  key={4}
                />
                <SingleButtonsRow digitalButtonsPerRow={["7", "8", "9"]}
                                  operationButtonsPerRow={["+", "MC"]}
                                  rowKey={0}
                                  key={0}
                />
                <SingleButtonsRow digitalButtonsPerRow={["4", "5", "6"]}
                                  operationButtonsPerRow={["-"]}
                                  rowKey={10}
                                  key={1}
                />
                <SingleButtonsRow digitalButtonsPerRow={["1", "2", "3"]}
                                  operationButtonsPerRow={["*"]}
                                  rowKey={20}
                                  key={2}
                />
                <SingleButtonsRow digitalButtonsPerRow={["0"]}
                                  operationButtonsPerRow={["=", ".", "/"]}
                                  rowKey={30}
                                  key={3}
                />
            </div>
        )
    }
}
