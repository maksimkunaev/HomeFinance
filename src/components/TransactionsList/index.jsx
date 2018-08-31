import React, { Component } from 'react';
import './TransactionsList.styl';
import { bind } from 'decko';
import cn from 'classnames';
import closeImg from "./images/close.png";

class TransactionsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayCurrency: '$',
            disabledCurrency: '€',
            currencyFieldOpen: false,
            exchangeRates: 1.114,
            inValidAmount: false,
            inValidDescription: false,
            amount: "",
        }
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

      if (displayCurrency === "$") {
          this.setState({
              displayCurrency: "€",
              disabledCurrency: "$",
              currencyFieldOpen: false
          })
      } else {
          this.setState({
              displayCurrency: "$",
              disabledCurrency: "€",
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



    render() {
        const { checkedTransaction,displayCurrency,disabledCurrency, currencyFieldOpen, exchangeRates} = this.state;

        const {transactions} = this.props;

        const euroClassName = cn({
            'displayAmounts-currency': true,
            "open": currencyFieldOpen
        })

        const euroSymbol = "€";
        const usdSymbol = "$";

        return (
            <div className='transactions'>
                <div className="displayAmounts">
                    <div className="displayAmounts-desc">Display amounts in</div>

                    <div className="displayAmounts__currency field" onClick={this.onOpenCurrencyField}>
                        <div className="fields__currency-usd">{displayCurrency}</div>
                        <div
                            className={euroClassName}
                            onClick={this.onChangeCurrency}>{disabledCurrency}</div>
                        <div className="fields__type-toggle" />
                    </div>

                    <div className="displayAmounts-to"><span>€</span> <span className="arrow">→</span><span>$</span></div>
                    <input
                        className="displayAmounts-exchange"
                        value={exchangeRates}
                        min="0"
                        step=""
                        onChange={this.onChangeRates}/>
                </div>
                {transactions.map(({
                    amount,
                    currency,
                    date,
                    description,
                    id,
                    type
                }) => {
                    return <div className="block" key={id}>
                        <div className="block__arrow">
                            <div className={type === "income"
                                ? "block__arrow-up"
                                : "block__arrow-down"} />
                        </div>

                        <div className="block__about">
                            <div className="block__about-desc">{description}</div>
                            <div className="block__about-date">{this.formateDate(new Date())}</div>
                        </div>

                        {type === 'expense'
                            ?   <div className="block__income">
                                    <div className="block__expanse-converted"> {displayCurrency} {amount}</div>
                                    <div className="block__expanse-nonConverted">{currency} {amount}</div>
                                </div>
                            : <div className="block__income">
                                    --
                                </div>}

                        {type === 'income'
                            ?    <div className="block__income">
                                    <div className="block__income-converted">{displayCurrency} {amount}</div>
                                    <div className="block__income-nonConverted">{currency} {amount}</div>
                                </div>

                            : <div className="block__income">
                                --
                            </div>}
                        <div className="block__remove" onClick={this.removeTransaction.bind(this, id)}>
                            <img className="block__remove-image"  src={closeImg} />
                        </div>
                    </div>
                })}
            </div>
        )
    }
}

export default TransactionsList;
