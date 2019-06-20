import React, { Component, Fragment } from 'react';
import classes from './Person.css';
import Aux from '../../../hoc/Auxillary';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    static contextType = AuthContext;

    componentDidMount() {
        console.log(this.context.authenticated);
    }

    render() {
        return (
            // <div className={classes.Person}>
            <Aux>
                <p onClick={this.props.click}>
                    I'm {this.props.name} and I am {this.props.age} years old
                </p>
                {this.context.authenticated ? <p>Logged In</p> : <p>Please login</p>}
                <input value={this.props.name} onChange={this.props.changed} />
            </Aux>
            // </div>
        );
    }
}

export default withClass(Person, classes.Person);