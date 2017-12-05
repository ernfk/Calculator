import React, {Component} from 'react';


export class OperationButton extends Component {
    constructor(props) {
        super(props);
    }

    onClick(event) {
        console.log('onClick: ', event);
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