import React, { Component } from 'react';
import './index.styl';
import Header from "./Header";
import TransactionsList from "./TransactionsList";
import container from "./container";

class App extends Component {

    render() {
        return (
            <div className='app'>
                <Header {...this.props}/>
                <TransactionsList {...this.props}/>
            </div>
        )
    }
}

export default container(App);
