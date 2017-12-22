import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../actions";

let operationButtonStyle = "operation-button";

class OperationButton extends Component {
    constructor(props) {
        super(props);
    }

    onClick(value) {
        const {
            selectOperationButton,
            selectResultButton,
            selectCleanAllButton,
            selectCleanLastButton,
            selectBracketButton,
            selectMemoryButton,
            selectMemoryCleanButton,
            selectMemoryReadButton,
            selectSquareButton,
            selectRootButton
        } = this.props;

        switch (value) {
            case "AC":
                selectCleanAllButton(value);
                break;
            case "C":
                selectCleanLastButton(value);
                break;
            case "=":
                selectResultButton(value);
                break;
            case "(":
                selectBracketButton(value);
                break;
            case ")":
                selectBracketButton(value);
                break;
            case "M+":
                selectMemoryButton(value);
                break;
            case "MC":
                selectMemoryCleanButton(value);
                break;
            case "MR":
                selectMemoryReadButton(value);
                break;
            case "sqr":
                selectSquareButton(value);
                break;
            case "root":
                selectRootButton(value);
                break;
            default:
                selectOperationButton(value)
        }
    }

    render() {
        let {value} = this.props;

        switch (value) {
            case "AC":
                operationButtonStyle = "operation-button-ac";
                break;
            case "C":
                operationButtonStyle = "operation-button-c";
                break;
            case "sqr":
                operationButtonStyle = "square-button";
                break;
            case "root":
                operationButtonStyle = "square-root-button";
                break;
            default:
                operationButtonStyle = "operation-button";
                break;
        }

        return (
            <div className={operationButtonStyle} onClick={this.onClick.bind(this, value)}>
                <span className="button-value"> {value} </span>
            </div>
        )
    }
}

export default connect(null, actions)(OperationButton);