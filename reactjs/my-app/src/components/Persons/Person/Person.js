import React, { Component, Fragment } from 'react';
import classes from './Person.css';
import Aux from '../../../hoc/Auxillary';
import withClass from '../../../hoc/withClass';

class Person extends Component {
    render() {
        return (
            <div className={classes.Person}>
            
                <p onClick={this.props.click}>
                    I'm {this.props.name} and I am {this.props.age} years old
                </p>
                <input value={this.props.name} onChange={this.props.changed} />
            </div>
        );
    }
}

export default Person;