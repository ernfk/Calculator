import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../actions";

class OperationButton extends Component {
    constructor(props) {
        super(props);
    }

    onClick(value) {
        const {selectOperationButton, selectResultButton} = this.props;
        value === "=" ? selectResultButton(value) : selectOperationButton(value);
    }

    render() {
        const {value} = this.props;
        return (
            <div className="operation-button" onClick={this.onClick.bind(this, value)}>
                <span className="button-value"> {value} </span>
            </div>
        )
    }
}

export default connect(null, actions)(OperationButton);