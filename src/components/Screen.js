import React, {Component} from "react";
import {connect} from "react-redux";
import * as PropTypes from "react/lib/ReactPropTypes";


export class Screen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {equation, result} = this.props;
        let equationToShow = equation.join(' ');
        let showingData = null;
        console.log('Equation to show: ', equationToShow);
        console.log('Result: ', result);

        showingData = result === null ? equationToShow : result;

        console.log(showingData);
        return (
            <div>
                #Screen
                <input className="screen" type="text" value={showingData} />
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