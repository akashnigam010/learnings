import React, { Component } from 'react';
import './Person.css';

class Person extends Component {
    render() {
        return (
            <div className="Person">
                <p onClick={this.props.click}>
                    I'm {this.props.name} and I am {this.props.age} years old
                </p>
                <input value={this.props.name} onChange={this.props.changed} />
            </div>
        );
    }
}

export default Person;