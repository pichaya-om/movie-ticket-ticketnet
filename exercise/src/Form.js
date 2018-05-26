import React, {Component} from 'react';
import './Form.css';
import axios from 'axios'

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

    handleChangeNumber(event){
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

        if(this.state.number == 0)
        {
            alert('Please enter no. of tickets');
        }
        else
        {
            if(cash_input > total_amount)
            {
                let change = cash_input - total_amount;
                let change_array = [];

                available_change.map(value => {
                    if (change > 0) {
                        console.log('cur value: '+ value);
                        while(change/value >= 1 ){
                            let quot = change/value;
                            for(var i = 1; i <= quot; i++){
                                change_array.push(value);
                            }
                            change = change % value;
                            console.log('quot: '+quot);
                            console.log('change remains: '+change);
                        }
                    }

                });

                this.setState({
                    cash_input: cash_input,
                    change: initial_change,
                    change_text: change_array.reduce((prev, curr) => [prev, ', ', curr]),
                    first_page: false});
            }
            else if (cash_input == total_amount)
            {
                this.setState({
                    cash_input: cash_input,
                    change: 0,
                    first_page: false});
            }
            else
            {
                alert('Cash input is not enough');
            }
        }
    }

    handleBack(event){
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

        const firstPage = (
            <div className='MovieForm'>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label>
                        Select your movie:
                        <select value={this.state.movie} onChange={this.handleChangeMovie} defaultValue={this.state.movie}>
                            {optionItems}
                        </select>
                    </label>
                    <div/>
                    <label>
                        No. of ticket(s):
                        <input type='number' defaultValue={this.state.number} onChange={this.handleChangeNumber}/>
                    </label>
                    <div/>
                    <hr/>
                    <label> Total amount: </label>
                    <input readOnly='true' value={this.state.total}/>
                    <span> baht</span>
                    <hr/>
                    <label>
                        Cash Input:
                        <input type='number' ref='cash_input' defaultValue={0}/>
                    </label>
                    <div/>
                    <hr/>
                    <input type="submit" value="Buy Tickets"/>
                </form>
            </div>
        );

        const seceondPage = (
            <div className='MovieForm'>
                <h3> Ticket Summary </h3>
                <div> Movie {this.state.movie} </div>
                <div> Number {this.state.number} </div>
                <div> Price/ticket {this.state.price} </div>
                <div> Total {this.state.total} </div>
                <hr/>
                <div> Cash Input {this.state.cash_input} </div>
                <hr/>
                <div> Change: {this.state.change} </div>
                <div> change_text: {this.state.change_text} </div>
                <button onClick={this.handleBack}> back </button>
            </div>
        );

        return (
            this.state.first_page ? firstPage : seceondPage
        );
    }

}

export default Form;

