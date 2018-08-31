import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
    addTransaction: transaction => {
        dispatch({
            type: 'add',
            transactionType: transaction.checkedTransaction,
            currency: transaction.checkedCurrency,
            amount: transaction.amount,
            description: transaction.description,
            date: Date.now(),
            id: Date.now(),
            amountInUSD: transaction.amountInUSD,
            amountInEuro: transaction.amountInEuro
        })
    },
    removeTransaction: id => {
        dispatch({
            type: 'remove',
            id: id
        })
    },

})

export default component => connect(mapStateToProps, mapDispatchToProps)(component);
