import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hi, this is a react app</h1>
        <Person name="Akash" age="28">Hello World</Person>
      </div>
    );
  }
}

export default App;
