import React, { Component } from 'react';
import './Header.styl';
import { bind } from 'decko';
import cn from 'classnames';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currencyFieldOpen: false,
            typeFieldOpen: false,
            inValidAmount: false,
            inValidDescription: false,
            amount: "",
            description: "",
            checkedTransaction: "expense",
            disabledTransaction: "income",
            checkedCurrency: "$",
            disabledCurrency: "€"
        }
    }

    @bind
    onOpenTypeField() {

        this.setState({
            typeFieldOpen: !this.state.typeFieldOpen
        })
    }

    @bind
    onOpenCurrencyField() {

        this.setState({
            currencyFieldOpen: !this.state.currencyFieldOpen
        })
    }

    @bind
    onChangeAmount(e) {
        this.setState({
            inValidAmount: false,
        })

        this.setState({
            amount: e.target.value,
        })
    }

    @bind
    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
            inValidDescription: false,
        })
    }

    @bind
    onChangeTransactionType(e) {
        const { checkedTransaction } = this.state;

        if (checkedTransaction === "expense") {
            this.setState({
                checkedTransaction: "income",
                disabledTransaction: "expense",
                typeFieldOpen: false
            })
        } else {
            this.setState({
                checkedTransaction: "expense",
                disabledTransaction: "income",
                typeFieldOpen: false
            })
        }
    }

    @bind
    onChangeCurrency(e) {
        const { checkedCurrency, disabledCurrency } = this.state;

        if (checkedCurrency === "$") {
            this.setState({
                checkedCurrency: "€",
                disabledCurrency: "$",
                currencyFieldOpen: false
            })
        } else {
            this.setState({
                checkedCurrency: "$",
                disabledCurrency: "€",
                currencyFieldOpen: false
            })
        }
    }

    @bind
    addTransaction() {
        const {amount, description, checkedCurrency, checkedTransaction} = this.state;

        if (!amount) {
            this.setState({
                inValidAmount: true
            })
            return
        }

        if (!description) {
            this.setState({
                inValidDescription: true
            })
            return
        }

        let amountInEuro, amountInUSD;

        if (checkedTransaction === "$") {
            amountInUSD = amount;
            amountInEuro = amount * 1.114;
        } else {
            amountInEuro = amount;
            amountInUSD = amount / 1.114;
        }

        this.props.addTransaction({
            amount,
            description,
            checkedCurrency,
            checkedTransaction,
            amountInEuro,
            amountInUSD
        })

        // this.setState({
        //     currencyFieldOpen: !this.state.currencyFieldOpen
        // })
    }

    render() {
        const incomeClassName = cn({
            'fields__type-income': true,
            "open":this.state.typeFieldOpen
        })

        const euroClassName = cn({
            'fields__type-income': true,
            "open":this.state.currencyFieldOpen
        })

        const amountCLassName = cn({
            'fields__amount field': true,
            "invalid": this.state.inValidAmount
        })

        const descriptionClassName = cn({
            'fields__description field': true,
            "invalid": this.state.inValidDescription
        })

        const { checkedTransaction, disabledTransaction,checkedCurrency, disabledCurrency } = this.state;

        return (
            <div className="header">
                <div className="title">Home Finance</div>
                <div className="fields">
                    <div className="fields__type field" onClick={this.onOpenTypeField}>
                        <div className="fields__type-expense">{checkedTransaction}</div>
                        <div
                            className={incomeClassName}
                            onClick={this.onChangeTransactionType}>{disabledTransaction}</div>
                        <div className="fields__type-toggle" />
                    </div>

                    <div className="fields__currency field" onClick={this.onOpenCurrencyField}>
                        <div className="fields__currency-usd">{checkedCurrency}</div>
                        <div
                            className={euroClassName}
                            onClick={this.onChangeCurrency}>{disabledCurrency}</div>
                        <div className="fields__type-toggle" />
                    </div>

                    <input
                        className={amountCLassName}
                        type="number"
                        min="0"
                        step=""
                        value={this.state.amount}
                        onChange={this.onChangeAmount}/>
                    <input
                        className={descriptionClassName}
                        type="text"
                        placeholder="DECSRIPTION"
                        value={this.state.description}
                        onChange={this.onChangeDescription}/>
                    <button className="fields__add field" onClick={this.addTransaction}>Add</button>
                </div>
            </div>
        )
    }
}

export default Header;
