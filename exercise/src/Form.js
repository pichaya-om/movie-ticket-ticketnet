import React, {Component} from 'react';
import './Form.css';
import axios from 'axios'
import {Button} from 'reactstrap';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_page: true,
            movie_list: [],
            movie: '',
            price: 0,
            number: 0,
            total: 0,
            cash_input: 400,
            change: 0,
            change_text: '-'
        };

        this.handleChangeMovie = this.handleChangeMovie.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        axios.get('http://www.mocky.io/v2/5af178123000003700ba7ff2')
            .then(response => {
                this.setState({
                    movie_list: response.data.data,
                    movie: response.data.data[0].name,
                    price: response.data.data[0].price
                });
            });
    }

    handleChangeMovie(event) {
        let price = parseInt(event.target.childNodes[event.target.selectedIndex].getAttribute('price'));

        this.setState({
            movie: event.target.value,
            price: price
        }, () => {
            console.log("this.state.movie: " + this.state.movie);
            console.log("this.state.number: " + this.state.number);
            console.log("this.state.price: " + this.state.price);

            this.setState({total: this.state.price * this.state.number}, () => {
                console.log('total: ' + this.state.total);
            });
        });

    }

    handleChangeNumber(event) {
        this.setState({
            number: event.target.value,
        }, () => {
            console.log("this.state.movie: " + this.state.movie);
            console.log("this.state.number: " + this.state.number);
            console.log("this.state.price: " + this.state.price);

            this.setState({total: this.state.price * this.state.number}, () => {
                console.log('total: ' + this.state.total);
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let available_change = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
        let cash_input = this.refs.cash_input.value;
        let total_amount = this.state.total;
        let initial_change = cash_input - total_amount;

        if (this.state.number == 0) {
            alert('Please enter no. of tickets');
        }
        else {
            if (cash_input > total_amount) {
                let change = cash_input - total_amount;
                let change_array = [];

                available_change.map(value => {
                    if (change > 0) {
                        console.log('cur value: ' + value);
                        while (change / value >= 1) {
                            let quot = change / value;
                            for (var i = 1; i <= quot; i++) {
                                change_array.push(value);
                            }
                            change = change % value;
                            console.log('quot: ' + quot);
                            console.log('change remains: ' + change);
                        }
                    }

                });

                this.setState({
                    cash_input: cash_input,
                    change: initial_change,
                    change_text: change_array.reduce((prev, curr) => [prev, ', ', curr]),
                    first_page: false
                });
            }
            else if (cash_input == total_amount) {
                this.setState({
                    cash_input: cash_input,
                    change: 0,
                    first_page: false
                });
            }
            else {
                alert('Cash input is not enough');
            }
        }
    }

    handleBack(event) {
        event.preventDefault();

        axios.get('http://www.mocky.io/v2/5af178123000003700ba7ff2')
            .then(response => {
                this.setState({
                    first_page: true,
                    movie: response.data.data[0].name,
                    price: response.data.data[0].price,
                    number: 0,
                    total: 0,
                    change: 0,
                    change_text: '-'
                });
            });

    }

    render() {

        let movieList = this.state.movie_list;
        let optionItems = movieList.map((movie) => {
                if (movie.now_showing) {
                    return <option key={movie.id} price={movie.price}>{movie.name}</option>
                }
            }
        );

        let aRight = {
            textAlign: 'right'
        };

        let selectStyle = {
            'padding-left': '0px'
        };

        let boldFont = {
            'font-weight': 'bold'
        };

        const firstPage = (
            <div className='container'>
                <div class="row">
                    <div class="col-md-12">
                        <form onSubmit={(e) => this.handleSubmit(e)}>

                            <div class="col-md-6 offset-md-3">
                                <div className='card'>
                                    <h5 className='card-header'> Select your movie </h5>
                                    <div className="card-body">
                                        <div className='form-label'>
                                            Select your movie
                                        </div>
                                        <div className='col-md-6' style={selectStyle}>
                                            <select className='form-control' value={this.state.movie}
                                                    onChange={this.handleChangeMovie}
                                                    defaultValue={this.state.movie}>
                                                {optionItems}
                                            </select>
                                        </div>
                                        <br/>
                                        <div className='form-label'>
                                            No. of ticket(s)
                                        </div>
                                        <input type='number' min={0} defaultValue={this.state.number}
                                               onChange={this.handleChangeNumber}/>
                                    </div>
                                </div>
                            </div>
                            <br/>

                            <div className="col-md-6 offset-md-3">
                                <div className='card'>
                                    <h5 className='card-header'> Payment </h5>
                                    <div className="card-body">
                                        <div className='form-label'>
                                            Total amount
                                        </div>
                                        <input readOnly='true' value={this.state.total}/>
                                        <span> baht </span>

                                        <br/>
                                        <br/>
                                        <div className='form-label'>
                                            Cash Input
                                        </div>
                                        <input type='number' min={0} ref='cash_input' defaultValue={this.state.cash_input}/> baht

                                        <br/>
                                        <br/>
                                        <input type="submit" className='btn btn-success' value='BUY TICKET'></input>
                                    </div>
                                </div>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        );

        const seceondPage = (
            <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-6 offset-md-3">
                            <div className='card'>
                                <h5 className='card-header'> Ticket Summary </h5>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-md-4 text-right' >
                                            <h5 style={aRight}>
                                                {this.state.movie}
                                            </h5>
                                        </div>
                                        <div className='col-md-6' style={boldFont}>
                                            X {this.state.number}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-4 text-right'>
                                            Price per ticket
                                        </div>
                                        <div className='col-md-6'>
                                            {this.state.price}
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-4 text-right'>
                                            Total
                                        </div>
                                        <div className='col-md-6'>
                                            {this.state.total}
                                        </div>
                                    </div>
                                    <hr/>

                                    <div className='row'>
                                        <div className='col-md-4 text-right'>
                                            Cash Input
                                        </div>
                                        <div className='col-md-6'>
                                            {this.state.cash_input}
                                        </div>
                                    </div>
                                    <hr/>


                                    <div className='row'>
                                        <div className='col-md-4 text-right'>
                                            Change amount
                                        </div>
                                        <div className='col-md-6'>
                                            {this.state.change}
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-4 text-right'>
                                            Change details
                                        </div>
                                        <div className='col-md-6'>
                                            {this.state.change_text}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className='col-md-6 offset-md-3'>
                            <button className='btn' onClick={this.handleBack}> GO BACK </button>
                        </div>
                    </div>
                </div>
            </div>

                );

                return (
                this.state.first_page ? firstPage : seceondPage
                );
                }

                }

                export default Form;

