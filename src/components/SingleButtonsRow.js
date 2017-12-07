import React, {Component} from "react";
import DigitalButton from "./DigitalButton";
import OperationButton from "./OperationButton";

let singleButtonsRowStyle = "single-row";

export class SingleButtonsRow extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let buttons = [];
        const {digitalButtonsPerRow, operationButtonsPerRow, rowKey} = this.props;

        if (digitalButtonsPerRow.length !== 0) {
            digitalButtonsPerRow.forEach((digitalButton, index) => {
                buttons.push(<DigitalButton value={digitalButton} key={rowKey + index}/>);
            });
        }

        operationButtonsPerRow.forEach((operationButton, index) => {
            buttons.push(<OperationButton value={operationButton} key={rowKey + index + 4}/>);
        });

        if (buttons.length < 3) singleButtonsRowStyle = "single-row-less-buttons";

        return (
            <div className={singleButtonsRowStyle}>
                {buttons}
            </div>
        )
    }
}