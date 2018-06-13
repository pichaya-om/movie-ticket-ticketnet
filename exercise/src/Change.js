import React, {Component} from 'react';

class Change extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-5 text-center'>
                    <button className={`change-${ this.props.change_type} change-btn btn btn-default`}>
                        {this.props.change_type}
                    </button>
                </div>
                <div className='col-md-6'>
                    X {this.props.amount}
                </div>
            </div>

        );
    }
}

export default Change;