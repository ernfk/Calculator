import React, {Component} from "react";
import {connect} from "react-redux";


export class History extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {savedResults} = this.props;
        return (
            <div className="history-title">
                HISTORY OF CALCULATIONS
                {savedResults.map((eachResult, index) => {
                    return (
                        <div>
                            <div className="history-date"
                                 key={index}
                                 style={{color: "rgba(0, 0, 0," + `${1 - index * 0.15}` + ")"}}
                            >
                                {eachResult.date}
                            </div>
                            <div className="history-result"
                                 style={{color: "rgba(211, 219, 72," + `${1 - index * 0.15}` + ")"}}
                            >
                                {eachResult.result}
                            </div>
                        </div>
                    )
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

