import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        }
    }) => {
        dispatch({
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
        })
    },
    removeTransaction: id => {
        dispatch({
            type: 'remove',
            id: id
        })
    }
})

export default component => connect(mapStateToProps, mapDispatchToProps)(component);
