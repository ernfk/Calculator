import React, {Component} from "react";
import DigitalButton from "./DigitalButton";
import {OperationButton} from "./OperationButton";

export class SingleButtonsRow extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let buttons = [];
        const {digitalButtonsPerRow, operationButtonsPerRow, rowKey} = this.props;

        digitalButtonsPerRow.forEach((digitalButton, index) => {
            buttons.push(<DigitalButton value={digitalButton} key={rowKey + index}/>);
        });

        operationButtonsPerRow.forEach((operationButton, index) => {
            buttons.push(<OperationButton value={operationButton} key={rowKey + index + 4}/>);
        });


        return (
            <div className="single-row">
                {buttons}
            </div>
        )
    }
}