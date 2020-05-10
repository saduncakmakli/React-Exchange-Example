import React from 'react';
import '../css/financialStatement.css';
import {numberAddpx} from '../jslib.js';

function FinancialStatementCompanent(props) {
    return (
      <div
        ref={props.financialStatementDiv}
        className={"FinancialStatement"}
        style={{ top: numberAddpx(props.positon_top), left: numberAddpx(props.positon_left) }}
        onMouseDown={(event) => props.handleOnMouseDown(event, "FinancialStatement")}>
        <table className="FinancialStatementTable">
          <tr>
            <th><div><p>Parity</p></div></th>
            <th><div><p>Value</p></div></th>
          </tr>
          <tr>
            <td><p>TL</p></td>
            <td><p>{props.FinancialStatement.TL.toFixed(2)}</p></td>
          </tr>
          <tr>
            <td><p>USD</p></td>
            <td><p>{props.FinancialStatement.USD.toFixed(2)}</p></td>
          </tr>
          <tr>
            <td><p>EUR</p></td>
            <td><p>{props.FinancialStatement.EURO.toFixed(2)}</p></td>
          </tr>
          <tr>
            <td><p>GAU</p></td>
            <td><p>{props.FinancialStatement.GAU.toFixed(2)}</p></td>
          </tr>
        </table>
      </div>
    );
  }

export default FinancialStatementCompanent;