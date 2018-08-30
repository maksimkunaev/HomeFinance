import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/';

import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducer from './store'

const store = createStore(reducer);

ReactDOM.render(<App store={store}/>,  document.getElementById('root'));
