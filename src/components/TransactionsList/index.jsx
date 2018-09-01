import React, { Component } from 'react';
import './TransactionsList.styl';
import { bind } from 'decko';
import cn from 'classnames';
import closeImg from "./images/close.png";

class TransactionsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayCurrency: 'USD',
            disabledCurrency: 'EURO',
            currencyFieldOpen: false,
            exchangeRates: 1.114,
            inValidAmount: false,
            inValidDescription: false,
            amount: "",
        }
    }

    componentDidMount() {
        this.getInitialRemote();
    }

    @bind
    getInitialRemote() {
        this.props.getAllFromRemoteDb();
    }

    @bind
    removeTransaction(id){
        const {removeTransaction} = this.props;

        removeTransaction(id)

    }

    @bind
    onOpenCurrencyField() {
        this.setState({
            currencyFieldOpen: !this.state.currencyFieldOpen
        })
    }

    @bind
    onChangeCurrency(e) {
      const { displayCurrency, disabledCurrency } = this.state;

      if (displayCurrency === "USD") {
          this.setState({
              displayCurrency: "EURO",
              disabledCurrency: "USD",
              currencyFieldOpen: false
          })
      } else {
          this.setState({
              displayCurrency: "USD",
              disabledCurrency: "EURO",
              currencyFieldOpen: false
          })
      }
    }

    @bind
    onChangeRates(e) {
        this.setState({
            exchangeRates: e.target.value,
        })
    }

    formateDate() {
        let date = new Date()

        let options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        };

        return date.toLocaleString("en-us", options)
    }

    @bind
    calculateTOtalAmount() {
        const {transactions} = this.props;
        const {displayCurrency} = this.state;

        const summa = transactions.reduce((acc, item) => {
            if (item.transactionType === 'income') {
                return acc + item.amountIn[displayCurrency]
            } else {

                return acc - item.amountIn[displayCurrency]
            }
        },0 );

        let moduleSumma = Math.abs(summa);

        return {
            total: Math.round(moduleSumma * 100) / 100,
            positive: summa > 0
        };
    }

    @bind
    renderTopBlock() {

        const { displayCurrency, disabledCurrency, exchangeRates, currencyFieldOpen } = this.state;

        const euroClassName = cn({
            'displayAmounts-currency': true,
            "open": currencyFieldOpen
        })

        const currencySymbol = {
            EURO: "€",
            USD: "$"
        }

        return <div className="displayAmounts">
            <div className="displayAmounts-desc">Display amounts in</div>

            <div className="displayAmounts__currency field" onClick={this.onOpenCurrencyField}>
                <div className="fields__currency-USD">{currencySymbol[displayCurrency]}</div>
                <div
                    className={euroClassName}
                    onClick={this.onChangeCurrency}>{currencySymbol[disabledCurrency]}</div>
                <div className="fields__type-toggle" />
            </div>

            <div className="displayAmounts-to">{currencySymbol.EURO} <span className="arrow">→</span>{currencySymbol.USD}</div>
            <input
                className="displayAmounts-exchange"
                value={exchangeRates}
                min="0"
                step=""
                onChange={this.onChangeRates}/>
        </div>
    }


    render() {
        const { displayCurrency,disabledCurrency, currencyFieldOpen, exchangeRates} = this.state;

        const {transactions, loading} = this.props;

        const currencySymbol = {
            EURO: "€",
            USD: "$"
        }
        const {total, positive} = this.calculateTOtalAmount();

        const summaClassName = cn({
            'block__balance-value': true,
            "positive": positive
        })

        const topBlock = this.renderTopBlock();

        return (
            <div className='transactions'>
                {transactions.length ? topBlock : null}
                {!loading && !transactions.length && <div className='transactions__addSome'>Add Some Financial Records</div>}
                {loading && <div className='transactions__addSome'>Loading...</div>}

                <div className="transactions__list">
                    {transactions.map(({
                        amount,
                        currency,
                        date,
                        description,
                        id,
                        transactionType,
                        amountIn,

                    }) => {
                        return <div className="block" key={id}>
                            <div className="block__arrow">
                                <div className={transactionType === "income"
                                    ? "block__arrow-up"
                                    : "block__arrow-down"} />
                            </div>

                            <div className="block__about">
                                <div className="block__about-desc">{description}</div>
                                <div className="block__about-date">{this.formateDate(new Date())}</div>
                            </div>

                            {transactionType === 'expense'
                                ?   <div className="block__expense">
                                        <div className="block__expanse-converted"> {currencySymbol[displayCurrency]} {amountIn[displayCurrency]}</div>
                                        <div className="block__expanse-nonConverted">{currencySymbol[currency]} {amount}</div>
                                    </div>
                                : <div className="block__expense block__empty">
                                        --
                                    </div>}

                            {transactionType === 'income'
                                ?    <div className="block__income">
                                        <div className="block__income-converted">{currencySymbol[displayCurrency]} {amountIn[displayCurrency]}</div>
                                        <div className="block__income-nonConverted">{currencySymbol[currency]} {amount}</div>
                                    </div>

                                : <div className="block__income block__empty">
                                    --
                                </div>}
                            <div className="block__remove" onClick={this.removeTransaction.bind(this, id)}>
                                <img className="block__remove-image"  src={closeImg} />
                            </div>
                        </div>
                    })}
                </div>

                {transactions.length > 0 && <div className="block__balance">
                    <div className="block__balance-text">Balance</div>
                    <div className={summaClassName}>{currencySymbol[displayCurrency]} {total}</div>
                </div> }

            </div>
        )
    }
}

export default TransactionsList;
