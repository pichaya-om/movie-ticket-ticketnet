import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie_list: [],
            movie: '',
            price: 0,
            number: 0,
            total: 0
        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleChangeMovie = this.handleChangeMovie.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        // let movieList = [];
        axios.get('http://www.mocky.io/v2/5af178123000003700ba7ff2')
            .then(response => {
                // console.log(response.data.data);
                this.setState({
                    movie_list: response.data.data,
                });
            });


        // console.log("movieList: "+movieList);
    }

    handleChangeMovie(event) {
        let price = parseInt(event.target.childNodes[event.target.selectedIndex].getAttribute('price'));

        this.setState({
            movie: event.target.value,
            price: price
        }, () => {
            console.log("this.state.movie: " + this.state.movie);
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
            console.log("this.state.number: " + this.state.number);

            this.setState({total: this.state.price * this.state.number}, () => {
                console.log('total: ' + this.state.total);
            });
        });
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.movie);
        event.preventDefault();
    }

    render() {

        let movieList = this.state.movie_list;
        // console.log('movieList: '+movieList);
        let optionItems = movieList.map((movie) => {
                if (movie.now_showing) {
                    return <option price={movie.price}>{movie.name}</option>
                }
            }
        );
        return (
            <div className='App'>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label>
                        Select your movie:
                        <select value={this.state.movie} onChange={this.handleChangeMovie}>
                            {optionItems}
                        </select>
                    </label>
                    <div/>
                    <label>
                        No. of ticket(s):
                        <input type='number' defaultValue={this.state.number} onChange={this.handleChangeNumber}/>
                    </label>
                    <div/>
                    <label> Total amount: </label>
                    <input readOnly='true' value={this.state.total}/>
                    <span> baht</span>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
    
}

export default App;

