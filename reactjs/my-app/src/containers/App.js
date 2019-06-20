import React, { useState } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import AuthContext from '../context/auth-context';

const App = props => {

  const [showDiv, setShowDiv] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);

  const [personsState, setPersonsState] = useState({
    persons: [
      { id: 123, name: 'Akash', age: 28 },
      { id: 321, name: 'Max', age: 29 }
    ]
  });

  const [inputText, setInputText] = useState('');

  const nameChangeHandler = (event, index) => {
    const person = { ...personsState.persons[index] };    // not mutating the state object directly, get a copy
    person.name = event.target.value;
    const persons = [...personsState.persons];
    persons[index] = person;                            // not mutating the state object directly, get a copy
    setPersonsState({ persons: persons });
  }

  const deletePersonHandler = (index) => {
    const persons = [...personsState.persons];
    persons.splice(index, 1);
    setPersonsState({ persons: persons });
  }

  const switchView = () => {
    setShowDiv(!showDiv);
  }

  const inputChangeHandler = (event) => {
    setInputText(event.target.value);
  }

  const deleteElementHandler = (index) => {
    const text = inputText.split('');
    text.splice(index, 1);
    const updatedText = text.join('');
    setInputText(updatedText);

  }

  const loginHandler = () => {
    setAuthenticated(!authenticated);
  }

  let persons = null;
  if (showDiv) {
    persons = <div>
      <Persons
        persons={personsState.persons}
        clicked={deletePersonHandler}
        changed={nameChangeHandler} />
    </div>;
  }

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ authenticated: authenticated, login: loginHandler }}>
        <Cockpit
          title={props.title}
          personsLength={personsState.persons.length}
          changed={inputChangeHandler}
          inputText={inputText}
          switchView={switchView}
          showDiv={showDiv}
          clicked={deleteElementHandler} />
        {persons}
      </AuthContext.Provider>
    </React.Fragment >
  );
}

export default withClass(App, classes.App);
