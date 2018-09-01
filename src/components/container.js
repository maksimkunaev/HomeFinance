import React, {Component} from 'react';
import {connect} from 'react-redux';
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

const remotePath = 'transactions';

const addToRemoteDb = (options) => {
    const path = `${remotePath}/${options.id}`;

    firebase.database().ref(path).set(options);
}

const removeFromRemoteDb = (id) => {
    const path = `${remotePath}/${id}`;

    firebase.database().ref(path).remove();
}

const normalizeList = list => {
    const arrayList = Object.values(list)
    return arrayList.sort((a, b) => b.date - a.date)
}

const mapStateToProps = state => ({
    transactions: state.transactions,
    loading: state.loading
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
        }
    }) => {
        const options = {
            type: 'add',
            transactionType: checkedTransaction,
            currency: checkedCurrency,
            amount: amount,
            description: description,
            date: Date.now(),
            id: Date.now() + Math.round(Math.random() * 1000),
            amountIn: {
                USD: Math.round(USD * 100) / 100,
                EURO: Math.round(EURO * 100) / 100
            }
        };
        addToRemoteDb(options);
        dispatch(options)
    },
    removeTransaction: (id) => {
        removeFromRemoteDb(id)
        dispatch({
            type: 'remove',
            id: id
        })
    },
    getAllFromRemoteDb: () => {

        firebase.database().ref(remotePath).once('value', snap => {
            const data = snap.val() || [];
            const list = normalizeList(data);

            dispatch({
                type: 'updateAll',
                list
            })

            dispatch({
                type: 'loaded',
                list
            })
        });
    }
})

export default component => connect(mapStateToProps, mapDispatchToProps)(component);
