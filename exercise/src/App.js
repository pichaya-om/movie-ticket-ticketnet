import React, {Component} from 'react';
import './Change.css';
import './App.css';
import axios from 'axios'

class App extends Component {
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
            change_hash: [],
            fireRedirect: false
        }
        ;

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
        let change_output = {1000: 0, 500: 0, 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0, 1: 0};

        let cash_input = this.refs.cash_input.value;
        let total_amount = this.state.total;
        let initial_change = cash_input - total_amount;

        if (this.state.number == 0) {
            alert('Please enter no. of tickets');
        }
        else {
            if (cash_input < total_amount) {
                alert('Cash input is not enough');
            }
            else {
                let change = cash_input - total_amount;
                // let change_array = [];

                available_change.map(value => {
                    if (change > 0) {
                        while (change / value >= 1) {
                            let quot = change / value;
                            for (var i = 1; i <= quot; i++) {
                                change_output[value] += 1;
                            }
                            change = change % value;
                        }
                    }

                });

                this.setState({
                    cash_input: cash_input,
                    change: initial_change,
                    change_hash: change_output,
                    first_page: false,
                    fireRedirect: true
                }, () => {
                    this.props.history.push({
                        pathname: '/summary',
                        state: {
                            image: this.state.image,
                            movie: this.state.movie,
                            number: this.state.number,
                            price: this.state.price,
                            total: this.state.total,
                            cash_input: this.state.cash_input,
                            change: initial_change,
                            change_hash: change_output
                        }
                    })
                });
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
                    change_hash: [],
                    cash_input: 0,
                    fireRedirect: false
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
                return <div
                    className={movie.name === this.state.movie ? "card card-list card-selected" : "card card-list"}
                    onClick={this.handleCardList.bind(this, movie.name, movie.price, movie.image)}>
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

        return (
            <div className='container'>
                <div className='row'>
                    {nowShowing}
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={(e) => this.handleSubmit(e)}>

                            <div className="col-md-6 offset-md-3">
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
    }

}

export default App;

