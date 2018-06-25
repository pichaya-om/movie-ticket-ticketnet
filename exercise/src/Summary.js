import React, {Component} from 'react';
import './Change.css';
import Change from './Change';
import {Link} from 'react-router-dom'

class Summary extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        let ticketStyle = {
            width: '25rem'
        };

        let boldFont = {
            'fontWeight': 'bold'
        };

        let marginTop = {
            'marginTop': '10px'
        };

        let changeList = this.props.location.state.change_hash;
        let changeAmount = Object.keys(changeList).reverse().map((key) => {
            let amount = changeList[key];
            if (amount !== 0) {
                return <Change change_type={key} amount={amount}/>
            }
        });

        let changeDetails;

        if (this.props.location.state.change !== 0) {
            changeDetails = <div className='row' style={marginTop}>
                <div className='col-md-6 text-right'>
                    Change details
                </div>
                <div className='col-md-6'>
                    {changeAmount}
                </div>
            </div>
        }
        else {
            changeDetails = <div/>;
        }

        return (
            <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                        <div className='card' style={ticketStyle}>
                            <img className="card-img-top" alt="Card image cap" src={this.props.location.state.image}/>
                            <div className="card-body">
                                <h5 className="card-title text-center">{this.props.location.state.movie} X {this.props.location.state.number} </h5>
                                <div className='row'>
                                    <div className='col-md-6 text-right'>
                                        Price per ticket
                                    </div>
                                    <div className='col-md-6'>
                                        {this.props.location.state.price}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 text-right'>
                                    </div>
                                    <div className='col-md-6'>
                                        X {this.props.location.state.number}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 text-right' style={boldFont}>
                                        Total
                                    </div>
                                    <div className='col-md-6' style={boldFont}>
                                        {this.props.location.state.total}
                                    </div>
                                </div>
                                <hr/>
                                <div className='row'>
                                    <div className='col-md-6 text-right'>
                                        Cash Input
                                    </div>
                                    <div className='col-md-6'>
                                        {this.props.location.state.cash_input}
                                    </div>
                                </div>
                                <hr/>
                                <div className='row'>
                                    <div className='col-md-6 text-right'>
                                        Change amount
                                    </div>
                                    <div className='col-md-6'>
                                        {this.props.location.state.change}
                                    </div>
                                </div>
                                {changeDetails}
                            </div>
                        </div>

                        <br/>
                        <div className='text-center'>
                            <Link type='button' className='btn btn-default' to="/home">BACK </Link>
                        </div>
                        <br/>
                        <br/>

                    </div>
                </div>
            </div>

        );
    }

}

export default Summary;

