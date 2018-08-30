import React, { Component } from 'react';
import './TransactionsList.styl';
import { bind } from 'decko';
import cn from 'classnames';

class TransactionsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactionsList: this.props.transactions
        }
    }

    @bind
    removeTransaction(id){
        const {removeTransaction} = this.props;

        removeTransaction(id)

    }

    render() {
        const {transactions} = this.props;
        console.log(`main`,transactions)

        return (
            <div className='transactions'>
                {transactions.map(({
                    amount,
                    currency,
                    date,
                    description,
                    id,
                    type
                }) => {
                    return <div className="block" key={id}>
                        <div className="block__arrow">{type}</div>
                        <div className="block__about">
                            <div className="block__about-desc">{description}</div>
                            <div className="block__about-date">{String(new Date(date))}</div>
                        </div>
                        <div className="block__expanse">
                            <div className="block__expanse-converted">{currency} {amount}</div>
                            <div className="block__expanse-nonConverted">nonConverted</div>
                        </div>
                        <div className="block__income">
                            <div className="block__income-converted">{currency} {amount}</div>
                            <div className="block__income-nonConverted">nonConverted</div>
                        </div>
                        <button className="block__remove" onClick={this.removeTransaction.bind(this, id)}>x</button>
                    </div>
                })}
            </div>
        )
    }
}

export default TransactionsList;
