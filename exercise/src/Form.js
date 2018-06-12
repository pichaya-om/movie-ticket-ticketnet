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
            image: '',
            price: 0,
            number: 0,
            total: 0,
            cash_input: 0,
            change: 0,
            change_text: '-'
        };

        this.handleChangeMovie = this.handleChangeMovie.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        axios.get('https://www.mocky.io/v2/5af178123000003700ba7ff2')
            .then(response => {
                this.setState({
                    movie_list: response.data.data,
                    movie: response.data.data[0].name,
                    image: response.data.data[0].image,
                    price: response.data.data[0].price
                });
            });
    }

    handleChangeMovie(event) {
        let obj = event.target.childNodes[event.target.selectedIndex];
        let price = parseInt(obj.getAttribute('price'));
        let image = obj.getAttribute('data-image');
        this.setState({
            movie: event.target.value,
            image: image,
            price: price
        }, () => {
            console.log("this.state.movie: " + this.state.movie);
            // console.log("this.state.index: " + this.state.index);
            // console.log("this.state.number: " + this.state.number);
            // console.log("this.state.price: " + this.state.price);

            this.setState({total: this.state.price * this.state.number}, () => {
                console.log('total: ' + this.state.total);
            });
        });

    }

    handleCardList(movie, price, image) {
        this.setState({
            movie: movie,
            image: image,
            price: price
        }, () => {
            this.setState({total: this.state.price * this.state.number}, () => {
                console.log('total: ' + this.state.total);
            });
        });
    }

    handleChangeNumber(event) {
        this.setState({
            number: event.target.value,
        }, () => {
            // console.log("this.state.movie: " + this.state.movie);
            // console.log("this.state.number: " + this.state.number);
            // console.log("this.state.price: " + this.state.price);

            this.setState({total: this.state.price * this.state.number}, () => {
                console.log('total: ' + this.state.total);
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let available_change = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
        let change_output = {1000:0, 500:0, 100:0, 50:0, 20:0, 10:0, 5:0, 2:0, 1:0};
        let change_details = "";

        let cash_input = this.refs.cash_input.value;
        let total_amount = this.state.total;
        let initial_change = cash_input - total_amount;

        if (this.state.number == 0) {
            alert('Please enter no. of tickets');
        }
        else {
            if (cash_input > total_amount) {
                let change = cash_input - total_amount;
                // let change_array = [];

                available_change.map(value => {
                    if (change > 0) {
                        // console.log('cur value: ' + value);
                        while (change / value >= 1) {
                            let quot = change / value;
                            for (var i = 1; i <= quot; i++) {
                                // change_array.push(value);
                                change_output[value]+=1;
                            }
                            change = change % value;
                            // console.log('quot: ' + quot);
                            // console.log('change remains: ' + change);
                        }
                    }

                });

                Object.keys(change_output).reverse().map(function (key) {
                    if(change_output[key] !== 0){
                        change_details = change_details + key + " X " + change_output[key]+ " \n ";
                    }
                });

                this.setState({
                    cash_input: cash_input,
                    change: initial_change,
                    // change_text: change_array.reduce((prev, curr) => [prev, ', ', curr]),
                    change_text: change_details,
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

        axios.get('https://www.mocky.io/v2/5af178123000003700ba7ff2')
            .then(response => {
                this.setState({
                    movie_list: response.data.data,
                    first_page: true,
                    movie: response.data.data[0].name,
                    image: response.data.data[0].image,
                    index: 0,
                    price: response.data.data[0].price,
                    number: 0,
                    total: 0,
                    change: 0,
                    change_text: '-',
                    cash_input: 0
                });
            });

    }

    render() {

        let movieList = this.state.movie_list;
        let optionItems = movieList.map((movie) => {
            if (movie.now_showing) {
                return <option key={movie.id} price={movie.price} data-image={movie.image}>{movie.name}</option>
            }
        });

        let nowShowing = movieList.map((movie) => {
            if (movie.now_showing) {
                return <div className={movie.name === this.state.movie? "card card-list card-selected" : "card card-list"} onClick={this.handleCardList.bind(this, movie.name, movie.price, movie.image)}>
                    <img className="card-img-top" alt="Card image cap" src={movie.image}/>
                    <div className="card-body">
                        <h5 className="card-title">{movie.name}</h5>
                    </div>
                </div>
            }
        });

        let selectStyle = {
            'padding-left': '0px'
        };

        let boldFont = {
            'fontWeight': 'bold'
        };

        let ticketStyle = {
            width: '25rem'
        };

        const firstPage = (
            <div className='container'>
                <div className='row'>
                    {nowShowing}
                </div>
                <br/>
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
                                            Price per ticket
                                        </div>
                                        <input readOnly='true' value={this.state.price}/>
                                        <br/>
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
                                        <input type='number' min={0} ref='cash_input'
                                               defaultValue={this.state.cash_input}/> baht

                                        <br/>
                                        <br/>
                                        <input type="submit" className='btn btn-success' value='BUY TICKET'></input>
                                        <br/>

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
                        <div className='card' style={ticketStyle}>
                            <img className="card-img-top" alt="Card image cap" src={this.state.image}/>
                            <div className="card-body">
                                <h5 className="card-title text-center">{this.state.movie} X {this.state.number} </h5>
                                <div className='row'>
                                    <div className='col-md-6 text-right'>
                                        Price per ticket
                                    </div>
                                    <div className='col-md-6'>
                                        {this.state.price}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 text-right'>
                                    </div>
                                    <div className='col-md-6'>
                                        X {this.state.number}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 text-right' style={boldFont}>
                                        Total
                                    </div>
                                    <div className='col-md-6' style={boldFont}>
                                        {this.state.total}
                                    </div>
                                </div>
                                <hr/>
                                <div className='row'>
                                    <div className='col-md-6 text-right'>
                                        Cash Input
                                    </div>
                                    <div className='col-md-6'>
                                        {this.state.cash_input}
                                    </div>
                                </div>
                                <hr/>
                                <div className='row'>
                                    <div className='col-md-6 text-right'>
                                        Change amount
                                    </div>
                                    <div className='col-md-6'>
                                        {this.state.change}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 text-right'>
                                        Change details
                                    </div>
                                    <div className='col-md-6 display-linebreak'>
                                        {this.state.change_text}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br/>
                        <div className='text-center'>
                            <button className='btn' onClick={this.handleBack}> GO BACK</button>
                        </div>
                        <br/>
                        <br/>

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

