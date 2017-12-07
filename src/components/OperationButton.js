import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../actions";

let operationButtonStyle = "operation-button";

class OperationButton extends Component {
    constructor(props) {
        super(props);
    }

    onClick(value) {
        const {selectOperationButton, selectResultButton, selectCleanAllButton} = this.props;

        switch (value) {
            case "AC":
                selectCleanAllButton(value);
                break;
            case "=":
                selectResultButton(value);
                break;
            default:
                selectOperationButton(value)
        }
    }

    render() {
        const {value} = this.props;
        operationButtonStyle = value === "AC" ? "operation-button-ac" : "operation-button";

        return (
            <div className={operationButtonStyle} onClick={this.onClick.bind(this, value)}>
                <span className="button-value"> {value} </span>
            </div>
        )
    }
}

export default connect(null, actions)(OperationButton);