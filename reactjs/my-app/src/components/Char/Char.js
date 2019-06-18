import React from 'react';
import './Char.css';

const Char = (props) => {

    return (
        <div className="Char" onClick={props.click}>{props.char}</div>
    );
}

export default Char;