import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from "firebase";

const config = {
    apiKey: "AIzaSyD6vhqhnoHOh4mZIoOFfIVIUggIdoZpmkc",
    authDomain: "homefinance-efee7.firebaseapp.com",
    databaseURL: "https://homefinance-efee7.firebaseio.com",
    projectId: "homefinance-efee7",
    storageBucket: "homefinance-efee7.appspot.com",
    messagingSenderId: "531254664309"
};

firebase.initializeApp(config);

const debRef = firebase.database().ref('transactions');

const addToRemoteDb = (index, options) => {
    const remotePath = `transactions/${index}`;

    firebase.database().ref(remotePath).set(options);
}

const removeFromRemoteDb = (index, options) => {
    const remotePath = `transactions/${index}`;

    firebase.database().ref(remotePath).remove(options);
}

const mapStateToProps = state => ({
        transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
        addTransaction: ({
                checkedTransaction,
                checkedCurrency,
                amount,
                description,
                amountIn: {
                        USD,
                        EURO
                },
                index
        }) => {
            const options = {
                    type: 'add',
                    transactionType: checkedTransaction,
                    currency: checkedCurrency,
                    amount: amount,
                    description: description,
                    date: Date.now(),
                    id: Date.now(),
                    amountIn: {
                            USD: Math.round(USD * 100) / 100,
                            EURO: Math.round(EURO * 100) / 100
                    }
            };

            addToRemoteDb(index, options);
            dispatch(options)
        },
        removeTransaction: id => {
            removeFromRemoteDb
            dispatch({
                    type: 'remove',
                    id: id
            })
        }
})




export default component => connect(mapStateToProps, mapDispatchToProps)(component);
