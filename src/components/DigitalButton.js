import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../actions";


class DigitalButton extends Component {
    constructor(props) {
        super(props);
    }

    onClick(event) {
        const {selectDigitalButton} = this.props;
        selectDigitalButton(event);
    }

    render() {
        const {value} = this.props;
        return (
            <div className="digital-button" onClick={this.onClick.bind(this, value)}>
                <span className="button-value"> {value} </span>
            </div>
        );
    }
}

export default connect(null, actions)(DigitalButton);


