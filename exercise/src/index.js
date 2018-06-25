import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Summary from './Summary';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/home" component={App}/>
            <Route path="/summary" component={Summary}/>
            <Redirect to="/home" />
        </Switch>
    </BrowserRouter>
    , document.getElementById('form'));

registerServiceWorker();
