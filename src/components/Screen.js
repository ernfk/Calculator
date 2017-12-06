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

        let equationToShow = equation
            .map(singleChar => singleChar + ' ')
            .join('')
            .trim();

        let showingData = null;
        console.log('Equation to show: ', equationToShow);
        console.log('Result: ', result);

        if (result === 'Bad input!') screenStyle = "screen-error";
        showingData = result === null ? equationToShow : result;

        console.log(showingData);
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