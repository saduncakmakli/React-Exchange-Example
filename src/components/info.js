import React from 'react';
import '../css/info.css';
import {numberAddpx} from '../jslib.js';

function InfoComponent(props) {
    return (
      <div
        ref={props.infoDiv}
        className={"Info"}
        style={{ top: numberAddpx(props.positon_top), left: numberAddpx(props.positon_left) }}
        onMouseDown={(event) => props.handleOnMouseDown(event, "Info")}
      >
        <p style={{ font: '19px "Comic Sans MS"', color: 'red', textAlign: 'center' }}>All components in this project can be moved with the mouse in the component it is in. <br /> The last click is always on top.</p>
  
      </div>);
  }

export default InfoComponent;