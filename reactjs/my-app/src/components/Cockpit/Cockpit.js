import React, { useEffect } from 'react';
import Validation from '../Validation/Validation';
import Char from '../Char/Char';
import './Cockpit.css';

const Cockpit = (props) => {

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup');
        }
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect 2');
        return () => {
            console.log('[Cockpit.js] cleanup 2');
        }
    });

    const classes = [];
    const buttonStyle = {
        backgroundColor: 'green',
        color: 'white',
        padding: '10px',
        border: '1px solid red',
        cursor: 'pointer'
    };

    if (props.showDiv) {
        buttonStyle.backgroundColor = 'red';
    }

    if (props.personsLength <= 2) {
        classes.push('red');
    }

    if (props.personsLength <= 1) {
        classes.push('bold');
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>Assignment Input</p>
            <input onChange={props.changed} value={props.inputText} />
            <p>Length: {props.inputText.length}</p>
            <Validation length={props.inputText.length} />
            {
                props.inputText.split('').map((char, index) => {
                    return (
                        <Char key={index} char={char} click={() => props.clicked(index)} />
                    )
                })
            }
            <br />
            <button style={buttonStyle} onClick={props.switchView}>Toggle</button>
        </div>
    );
}

export default React.memo(Cockpit);