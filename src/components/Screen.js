import React, {Component} from "react";
import {connect} from "react-redux";
import * as PropTypes from "react/lib/ReactPropTypes";

let screenStyle = "screen";

export class Screen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {equation, result, alreadyCalculated} = this.props;
        const equationToShow = prepareEquationToShow(equation);
        let showingData = null;

        if (result === 'Bad input!') screenStyle = "screen-error";
        if (result === null) screenStyle = "screen";

        showingData = getDateToShow(result, alreadyCalculated, equationToShow);

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
        result: state.buttons.result,
        alreadyCalculated: state.buttons.alreadyCalculated
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

/**
 * Due to:
 * 1) result value
 * 2) alreadyCalculatedState - represents flag boolean:
 *      - true means we've already some result of calculation,
 *      - false - not yet.
 * determines which data should be rendered: equation before calculation or already calculated result.
 * @param result
 * @param alreadyCalculatedState
 * @param equationToShow
 * @returns {*}
 */
const getDateToShow = (result, alreadyCalculatedState, equationToShow) => {
    let showingData;

    if (result === null && alreadyCalculatedState === false) {
        showingData = equationToShow;
    } else if (result !== null && alreadyCalculatedState === true) {
        showingData = result;
    } else {
        showingData = equationToShow;
    }
    return showingData;
};