import React, {Component} from 'react';

class Change extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button className={`change-${ this.props.change_type} change-btn btn btn-default`}>
                    {this.props.change_type}
                </button>
                X {this.props.amount}
            </div>

        );
    }
}

export default Change;