import React, { useEffect, useRef, useContext } from 'react';
import Validation from '../Validation/Validation';
import Char from '../Char/Char';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {

    const btnClickRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log(authContext.authenticated);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        btnClickRef.current.click();
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

    const assignedClasses = [];
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
        assignedClasses.push(classes.red);
    }

    if (props.personsLength <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>Assignment Input</p>
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
            <button
                ref={btnClickRef}
                style={buttonStyle}
                onClick={props.switchView}>
                Toggle
            </button>
            <button onClick={authContext.login}>Login</button>
        </div>
    );
}

export default React.memo(Cockpit);