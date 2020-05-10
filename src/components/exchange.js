import React from 'react';
import '../css/exchange.css';
import {calculateSellPrice,numberAddpx} from '../jslib.js';

function ExchangeComponent(props) {
    return (
      <div
        ref={props.exchangeDiv}
        className="Exchange"
        style={{ top: numberAddpx(props.positon_top), left: numberAddpx(props.positon_left) }}
        onMouseDown={(event) => props.handleOnMouseDown(event, "Exchange")}>
        <table>
          <tr>
            <td>
              <p>USD</p>
            </td>
            <td>
              <button
                className="Buy"
                onClick={() => props.handleClickExchange("USD", "BUY")}>
                <p>BUY {props.ExchangeRate.usd.buy.toFixed(4)}</p>
              </button>
            </td>
            <td>
              <button
                className="Sell"
                onClick={() => props.handleClickExchange("USD", "SELL")}>
                <p>SELL {calculateSellPrice(props.ExchangeRate.usd).toFixed(4)}</p>
              </button>
            </td>
          </tr>
  
          <tr>
            <td>
              <p>EUR</p>
            </td>
            <td>
              <button
                className="Buy"
                onClick={() => props.handleClickExchange("EURO", "BUY")}>
                <p>BUY {props.ExchangeRate.euro.buy.toFixed(4)}</p>
              </button>
            </td>
            <td>
              <button
                className="Sell"
                onClick={() => props.handleClickExchange("EURO", "SELL")}>
                <p>SELL {calculateSellPrice(props.ExchangeRate.euro).toFixed(4)}</p>
              </button>
            </td>
          </tr>
  
          <tr>
            <td>
              <p>GAU</p>
            </td>
            <td>
              <button
                className="Buy"
                onClick={() => props.handleClickExchange("GAU", "BUY")}>
                <p>BUY {props.ExchangeRate.gau.buy.toFixed(2)}</p>
              </button>
            </td>
            <td>
              <button
                className="Sell"
                onClick={() => props.handleClickExchange("GAU", "SELL")}>
                <p>SELL {calculateSellPrice(props.ExchangeRate.gau).toFixed(2)}</p>
              </button>
            </td>
          </tr>
        </table>
      </div>
    );
  }

  export default ExchangeComponent;