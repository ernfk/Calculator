import React, {Component} from "react";
import {connect} from "react-redux";


export class History extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {savedResults} = this.props;
        console.log(savedResults);
        return (
            <div className="history-title">
                HISTORY OF CALCULATIONS
                {savedResults.map(eachResult => {
                    return <div className="history-result"> {eachResult.date} {eachResult.result} </div>
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        savedResults: state.buttons.savedResults,
    }
};

export default connect(mapStateToProps, null)(History);

