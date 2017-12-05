import React, {Component} from "react";
import {connect} from "react-redux";
import * as PropTypes from "react/lib/ReactPropTypes";


export class Screen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {equation} = this.props;
        console.log(equation);
        let equationToShow = equation.join(' ');
        return (
            <div>
                #Screen
                <input className="screen" type="text" value={equationToShow} />
            </div>
        )
    }
}

Screen.propTypes = {
  equation: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        equation: state.buttons.equation
    }
};

export default connect(mapStateToProps, null)(Screen);