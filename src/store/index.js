import {
    combineReducers
} from 'redux';

const initialState = {
    transactions: [],
    loading: true
}

function updateTransactions(state = initialState.transactions, action) {
    switch (action.type) {
        case 'add':
            return [{
                transactionType: action.transactionType,
                currency: action.currency,
                amount: action.amount,
                description: action.description,
                date: action.date,
                id: action.id,
                amountIn: {
                    USD: action.amountIn.USD,
                    EURO: action.amountIn.EURO
                }
            }, ...state];

        case 'updateAll':
            return action.list;

        case 'remove':
            return state.filter(item => item.id !== action.id)
    }
    return state;
}

function getLoadingState(state = initialState.loading, action) {
    switch (action.type) {
        case 'loaded':
            return false;
    }
    return state;
}

export default combineReducers({
    transactions: updateTransactions,
    loading: getLoadingState
})
