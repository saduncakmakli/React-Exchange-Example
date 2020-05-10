import React from 'react';

import '../css/game.css';

import FinancialStatementCompanent from './financialStatement.js';
import ExchangeComponent from './exchange.js'
import InfoComponent from './info.js'

import {calculateSellPrice,calculateTranfer} from '../jslib.js';

class Game extends React.Component {

    constructor(props) {
        super(props)

        this.state =
        {
            ComponentStyle:
            {
                activeClient: {},
                Location:
                {
                    Info:
                    {
                        top: 70,
                        left: 70,
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
            },
            FinancialStatement:
            {
                TL: 500,
                USD: 100,
                EURO: 100,
                GAU: 10,
            },
            ExchangeRate:
            {
                usd: { buy: 7.11, commission: 3 },
                euro: { buy: 7.92, commission: 3 },
                gau: { buy: 387.45, commission: 3 },
            }
        };

        this.gameDiv = React.createRef();
        this.financialStatementDiv = React.createRef();
        this.exchangeDiv = React.createRef();
        this.infoDiv = React.createRef();
        this.Mouse = { clientX: {}, clientY: {}, tranferIsActive: {} }
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    }

    handleOnMouseDown(event, component) {
        const Statement = Object.assign({}, this.state);
        this.Mouse.clientX = event.clientX;
        this.Mouse.clientY = event.clientY;
        Statement.ComponentStyle.activeClient = component;
        this.Mouse.tranferIsActive = true;
        this.setState(Statement);
    }

    handleOnMouseUp() {
        this.Mouse.tranferIsActive = false;
    }

    handleOnMouseMove(event) {
        if (this.Mouse.tranferIsActive === true) {
            const Statement = Object.assign({}, this.state);
            const MouseMovement = { x: (event.clientX - this.Mouse.clientX), y: (event.clientY - this.Mouse.clientY) };

            switch (this.state.ComponentStyle.activeClient) {
                case "Info":
                    calculateTranfer(this.infoDiv.current, this.gameDiv.current, MouseMovement, Statement.ComponentStyle.Location.Info)
                    break;
                case "Exchange":
                    calculateTranfer(this.exchangeDiv.current, this.gameDiv.current, MouseMovement, Statement.ComponentStyle.Location.Exchange)
                    break;
                case "FinancialStatement":
                    calculateTranfer(this.financialStatementDiv.current, this.gameDiv.current, MouseMovement, Statement.ComponentStyle.Location.FinancialStatement)
                    break;
                default:
                    break;
            }

            this.Mouse.clientX = event.clientX;
            this.Mouse.clientY = event.clientY;
            this.setState(Statement);
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            10000
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

    componentInfo() {
        return (<InfoComponent
            infoDiv={this.infoDiv} //Div içerinin okunacağı değişken Referans olarak veriliyor.
            positon_top={this.state.ComponentStyle.Location.Info.top} //Render esnasındaki (STYLE) top değeri.
            positon_left={this.state.ComponentStyle.Location.Info.left} //Render esnasındaki (STYLE) left değeri.
            handleOnMouseDown={(event, className) => this.handleOnMouseDown(event, className)} //Mouse tıklamasını yakalayacak olan event.
        />);
    }

    componentExchange() {
        return (<ExchangeComponent
            exchangeDiv={this.exchangeDiv}
            positon_top={this.state.ComponentStyle.Location.Exchange.top}
            positon_left={this.state.ComponentStyle.Location.Exchange.left}
            handleOnMouseDown={(event, className) => this.handleOnMouseDown(event, className)}
            ExchangeRate={this.state.ExchangeRate}
            handleClickExchange={(operation, parity) => this.handleClickExchange(operation, parity)}
        />);
    }

    componentFinancialStatement() {
        return (<FinancialStatementCompanent
            financialStatementDiv={this.financialStatementDiv} //Div içerinin okunacağı değişken Referans olarak veriliyor.
            positon_top={this.state.ComponentStyle.Location.FinancialStatement.top} //Render esnasındaki (STYLE) top değeri.
            positon_left={this.state.ComponentStyle.Location.FinancialStatement.left} //Render esnasındaki (STYLE) left değeri.
            handleOnMouseDown={(event, className) => this.handleOnMouseDown(event, className)} //Mouse tıklamasını yakalayacak olan event.
            FinancialStatement={this.state.FinancialStatement}
        />);
    }

    activeClientComponent(activeClient) {
        switch (activeClient) {
            case "Info":
                return (this.componentInfo());
            case "Exchange":
                return (this.componentExchange());
            case "FinancialStatement":
                return (this.componentFinancialStatement());
            default:
                break;
        }
    }

    AllComponent(activeClient) {
        return (<div
            ref={this.gameDiv}
            className="Game"
            onMouseMove={(event) => this.handleOnMouseMove(event)}
            onMouseUp={() => this.handleOnMouseUp()}>
            {activeClient !== "FinancialStatement" && this.componentFinancialStatement()}
            {activeClient !== "Exchange" && this.componentExchange()}
            {activeClient !== "Info" && this.componentInfo()}
            {this.activeClientComponent(activeClient)}
        </div>);
    }

    render() { return (this.AllComponent(this.state.ComponentStyle.activeClient)); }
}

export default Game;