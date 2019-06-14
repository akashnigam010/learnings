import React from 'react';
import './Person.css';

const Person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old</p>
            <input value={props.name} onChange={props.changed} />
        </div>
    );
}

export default Person;