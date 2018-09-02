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
            checkedCurrency: "USD",
            disabledCurrency: "EURO"
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

        if (checkedCurrency === "USD") {
            this.setState({
                checkedCurrency: "EURO",
                disabledCurrency: "USD",
                currencyFieldOpen: false
            })
        } else {
            this.setState({
                checkedCurrency: "USD",
                disabledCurrency: "EURO",
                currencyFieldOpen: false
            })
        }
    }

    @bind
    addTransaction(e) {
        e.preventDefault();

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

        let amountInEURO, amountInUSD;

        if (checkedCurrency === "USD") {
            amountInUSD = amount;
            amountInEURO = amount / 1.114;
        } else {
            amountInEURO = amount;
            amountInUSD = amount * 1.114;
        }

        this.props.addTransaction({
            amount,
            description,
            checkedCurrency,
            checkedTransaction,
            amountIn: {
                USD: amountInUSD,
                EURO: amountInEURO
            }
        })

        this.setState({
            amount: "",
            description: ""
        })
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
        const currencySymbol = {
            EURO: "€",
            USD: "$"
        }

        return (
            <header className="header">
                <h1 className="title">Home Finance</h1>
                <form className="fields">
                    <div className="fields__type field" onClick={this.onOpenTypeField}>
                        <div className="fields__type-expense">{checkedTransaction}</div>
                        <div
                            className={incomeClassName}
                            onClick={this.onChangeTransactionType}>{disabledTransaction}</div>
                        <div className="fields__type-toggle" />
                    </div>

                    <div className="fields__currency field" onClick={this.onOpenCurrencyField}>
                        <div className="fields__currency-usd">{currencySymbol[checkedCurrency]}</div>
                        <div
                            className={euroClassName}
                            onClick={this.onChangeCurrency}>{currencySymbol[disabledCurrency]}</div>
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
                    <button type="submit" className="fields__add field" onClick={this.addTransaction}>Add</button>
                </form>
            </header>
        )
    }
}

export default Header;
