import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Main extends React.Component {

  constructor(props) {
    super(props)

    this.state =
    {
      ComponentStyle:
      {
        Location:
        {
          Market:
          {
            top: 100,
            left: 500,
          },
          Exchange:
          {
            top: -3,
            left: 140,
          },
          FinancialStatement:
          {
            left: -3,
            top: -3,
          }
        }
      }
    }

    this.Mouse = { clientX: {}, clientY: {}, activeClient: {}, tranferIsActive: {} }
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
  }

  handleOnMouseDown(event, component) {
    this.Mouse.clientX = event.clientX;
    this.Mouse.clientY = event.clientY;
    this.Mouse.activeClient = component;
    this.Mouse.tranferIsActive = true;
  }

  handleOnMouseUp(event, component) {
    this.Mouse.activeClient = {};
    this.Mouse.tranferIsActive = false;
  }

  handleOnMouseMove(event) {
    if (this.Mouse.tranferIsActive === true) {
      const Statement = Object.assign({}, this.state);
      const MouseMovement = { x: (event.clientX - this.Mouse.clientX), y: (event.clientY - this.Mouse.clientY) };


      switch (this.Mouse.activeClient) {
        case "Market":
          Statement.ComponentStyle.Location.Market.left += MouseMovement.x;
          Statement.ComponentStyle.Location.Market.top += MouseMovement.y;
          this.Mouse.clientX = event.clientX;
          this.Mouse.clientY = event.clientY;
          break;

        default:
          break;
      }

      this.setState(Statement);
    }
  }

  render() {
    return (
      <div
        className="Main"
        onMouseMove={(event) => this.handleOnMouseMove(event)}
        onMouseUp={(event) => this.handleOnMouseUp(event)}>
        <Game
          marketPositonTop={this.state.ComponentStyle.Location.Market.top}
          marketPositonLeft={this.state.ComponentStyle.Location.Market.left}
          exchangePositonTop={this.state.ComponentStyle.Location.Exchange.top}
          exchangePositonLeft={this.state.ComponentStyle.Location.Exchange.left}
          financialStatementPositonTop={this.state.ComponentStyle.Location.FinancialStatement.top}
          financialStatementPositonLeft={this.state.ComponentStyle.Location.FinancialStatement.left}
          handleOnMouseDown={(event, className) => this.handleOnMouseDown(event, className)}
        />
      </div>
    )
  }
}

class Game extends React.Component {


  constructor(props) {
    super(props)

    this.state =
    {
      FinancialStatement:
      {
        TL: 200,
        USD: 0,
        EURO: 0,
        GAU: 0,
      },
      ExchangeRate:
      {
        usd: { buy: 7.11, commission: 3 },
        euro: { buy: 7.92, commission: 3 },
        gau: { buy: 387.45, commission: 3 },
      },
      Market:
      {
        Stock:
        {
          hamburger: 0,
        },
        Price:
        {
          hamburger: 12,
        },
        DemandPerSecond:
        {
          hamburger: 1,
        }
      }
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const rand = Math.floor(Math.random() * 101);
    const select = rand % 6;
    const Statement = Object.assign({}, this.state);
    switch (select) {
      case 0:
        Statement.ExchangeRate.usd.buy += Statement.ExchangeRate.usd.buy * rand / 100000;
        break;

      case 1:
        Statement.ExchangeRate.usd.buy -= Statement.ExchangeRate.usd.buy * rand / 80000;
        break;

      case 2:
        Statement.ExchangeRate.euro.buy += Statement.ExchangeRate.euro.buy * rand / 100000;
        break;

      case 3:
        Statement.ExchangeRate.euro.buy -= Statement.ExchangeRate.euro.buy * rand / 80000;
        break;

      case 4:
        Statement.ExchangeRate.gau.buy += Statement.ExchangeRate.gau.buy * rand / 100000;
        break;

      case 5:
        Statement.ExchangeRate.gau.buy -= Statement.ExchangeRate.gau.buy * rand / 80000;
        break;
      default:

        break;
    }
    this.setState({
      Statement
    });
  }

  handleClickExchange(operation, parity) {
    const Statement = Object.assign({}, this.state);
    switch (operation + parity) {
      case "USDBUY":
        if ((Statement.FinancialStatement.TL - Statement.ExchangeRate.usd.buy) >= 0) {
          Statement.FinancialStatement.TL -= Statement.ExchangeRate.usd.buy;
          Statement.FinancialStatement.USD += 1;
        }
        break;
      case "USDSELL":
        if (Statement.FinancialStatement.USD >= 1) {
          Statement.FinancialStatement.TL += calculateSellPrice(Statement.ExchangeRate.usd);
          Statement.FinancialStatement.USD -= 1;
        }
        break;
      case "EUROBUY":
        if ((Statement.FinancialStatement.TL - Statement.ExchangeRate.euro.buy) >= 0) {
          Statement.FinancialStatement.TL -= Statement.ExchangeRate.euro.buy;
          Statement.FinancialStatement.EURO += 1;
        }
        break;
      case "EUROSELL":
        if (Statement.FinancialStatement.EURO >= 1) {
          Statement.FinancialStatement.TL += calculateSellPrice(Statement.ExchangeRate.euro);
          Statement.FinancialStatement.EURO -= 1;
        }
        break;
      case "GAUBUY":
        if ((Statement.FinancialStatement.TL - Statement.ExchangeRate.gau.buy) >= 0) {
          Statement.FinancialStatement.TL -= Statement.ExchangeRate.gau.buy;
          Statement.FinancialStatement.GAU += 1;
        }
        break;
      case "GAUSELL":
        if (Statement.FinancialStatement.GAU >= 1) {
          Statement.FinancialStatement.TL += calculateSellPrice(Statement.ExchangeRate.gau);
          Statement.FinancialStatement.GAU -= 1;
        }
        break;
      default:
        break;
    }
    this.setState({
      Statement
    });
  }

  render() {

    return (
      <div>
        <Market
          positon_top={this.props.marketPositonTop}
          positon_left={this.props.marketPositonLeft}
          handleOnMouseDown={(event, className) => this.props.handleOnMouseDown(event, className)}
        />
        <FinancialStatement
          positon_top={this.props.financialStatementPositonTop}
          positon_left={this.props.financialStatementPositonLeft}
          handleOnMouseDown={(event, className) => this.props.handleOnMouseDown(event, className)}
          FinancialStatement={this.state.FinancialStatement}
        />
        <Exchange
          positon_top={this.props.exchangePositonTop}
          positon_left={this.props.exchangePositonLeft}
          handleOnMouseDown={(event, className) => this.props.handleOnMouseDown(event, className)}
          ExchangeRate={this.state.ExchangeRate}
          handleClickExchange={(operation, parity) => this.handleClickExchange(operation, parity)}
        />
      </div>
    );
  }
}

class FinancialStatement extends React.Component {
  render() {

    const className = "FinancialStatement";
    var positon_top = this.props.positon_top + 'px';
    var positon_left = this.props.positon_left + 'px';

    return (
      <div className={className}
        style={{ top: positon_top, left: positon_left }}
        onMouseDown={(event) => this.props.handleOnMouseDown(event, className)}>
        <table className="FinancialStatementTable">
          <tr>
            <th><div><p>Parity</p></div></th>
            <th><div><p>Value</p></div></th>
          </tr>
          <tr>
            <td>
              <p>TL</p>
            </td>
            <td>
              <p>{this.props.FinancialStatement.TL.toFixed(4)}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>USD</p>
            </td>
            <td>
              <p>{this.props.FinancialStatement.USD.toFixed(4)}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>EURO</p>
            </td>
            <td>
              <p>{this.props.FinancialStatement.EURO.toFixed(4)}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>GAU</p>
            </td>
            <td>
              <p>{this.props.FinancialStatement.GAU.toFixed(2)}</p>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class Exchange extends React.Component {

  render() {

    const className = "Exchange";
    var positon_top = this.props.positon_top + 'px';
    var positon_left = this.props.positon_left + 'px';

    return (
      <div className={className}
        style={{ top: positon_top, left: positon_left }}
        onMouseDown={(event) => this.props.handleOnMouseDown(event, className)}>
        <table>
          <tr>
            <td>
              <p>USD</p>
            </td>
            <td>
              <button
                className="Buy"
                onClick={() => this.props.handleClickExchange("USD", "BUY")}>
                <p>BUY {this.props.ExchangeRate.usd.buy.toFixed(4)}</p>
              </button>
            </td>
            <td>
              <button
                className="Sell"
                onClick={() => this.props.handleClickExchange("USD", "SELL")}>
                <p>SELL {calculateSellPrice(this.props.ExchangeRate.usd).toFixed(4)}</p>
              </button>
            </td>
          </tr>

          <tr>
            <td>
              <p>EURO</p>
            </td>
            <td>
              <button
                className="Buy"
                onClick={() => this.props.handleClickExchange("EURO", "BUY")}>
                <p>BUY {this.props.ExchangeRate.euro.buy.toFixed(4)}</p>
              </button>
            </td>
            <td>
              <button
                className="Sell"
                onClick={() => this.props.handleClickExchange("EURO", "SELL")}>
                <p>SELL {calculateSellPrice(this.props.ExchangeRate.euro).toFixed(4)}</p>
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
                onClick={() => this.props.handleClickExchange("GAU", "BUY")}>
                <p>BUY {this.props.ExchangeRate.gau.buy.toFixed(2)}</p>
              </button>
            </td>
            <td>
              <button
                className="Sell"
                onClick={() => this.props.handleClickExchange("GAU", "SELL")}>
                <p>SELL {calculateSellPrice(this.props.ExchangeRate.gau).toFixed(2)}</p>
              </button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class Market extends React.Component {

  render() {
    const className = "Market";
    return (
      <div
        className={className}
        style={{ top: numberAddpx(this.props.positon_top), left: numberAddpx(this.props.positon_left) }}
        onMouseDown={(event) => this.props.handleOnMouseDown(event, className)}>
      </div>
    )
  }
}

//--------------------------------------------------------------------------

function calculateSellPrice(p) {
  const parity = Object.assign({}, p);
  return (parity.buy -= parity.buy * parity.commission / 100)
}

function numberAddpx(number) { return (number + 'px') }

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
