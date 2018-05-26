import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Form />, document.getElementById('form'));

registerServiceWorker();
