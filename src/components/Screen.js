import React, {Component} from "react";
import {connect} from "react-redux";
import * as PropTypes from "react/lib/ReactPropTypes";

let screenStyle = "screen";

export class Screen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {equation, result} = this.props;
        const equationToShow = prepareEquationToShow(equation);
        let showingData = null;


        if (result === 'Bad input!') screenStyle = "screen-error";
        showingData = result === null ? equationToShow : result;

        return (
            <div>
                <input className={screenStyle} type="text" value={showingData} placeholder="0"/>
            </div>
        )
    }
}

Screen.propTypes = {
    equation: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        equation: state.buttons.equation,
        result: state.buttons.result
    }
};

export default connect(mapStateToProps, null)(Screen);

export const prepareEquationToShow = (equation) => {
    return equation
        .map(singleChar => {
            if (isNaN(singleChar) && singleChar !== ".") singleChar = ' ' + singleChar + ' ';
            return singleChar;
        })
        .join('')
        .trim();
};