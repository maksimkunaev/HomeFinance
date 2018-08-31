import { combineReducers } from 'redux';

const initialState = {
    transactions: []
}


function updateTransactions(state = initialState.transactions, action) {
    switch (action.type){
        case 'add':
            return [...state, {
                type: action.transactionType,
                currency: action.currency,
                amount: action.amount,
                description: action.description,
                date: action.date,
                id: action.id,
                amountIn: {
                    USD: action.amountIn.USD,
                    EURO: action.amountIn.EURO
                }
            }];

        case 'remove':
            return state.filter(item => item.id !== action.id)
    }
    return state;
}


export default combineReducers({
    transactions: updateTransactions
})
