import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

const App = props => {

  const [showDiv, setShowDiv] = useState(true);

  const [personsState, setPersonsState] = useState({
    persons: [
      { id: 123, name: 'Akash', age: 28 },
      { id: 321, name: 'Max', age: 29 }
    ]
  });

  const [otherState, setOtherState] = useState({
    other: 'other vale'
  });

  const nameChangeHandler = (event, index) => {
    const person = {...personsState.persons[index]};
    person.name = event.target.value;
    const persons = [...personsState.persons];
    persons[index] = person;
    setPersonsState({persons: persons});
  }

  const deletePersonHandler = (index) => {
    const persons = [...personsState.persons];
    persons.splice(index, 1);
    setPersonsState({persons: persons});
  }

  const switchView = () => {
    setShowDiv(!showDiv);
  }

  const buttonStyle = {
    backgroundColor: 'white',
    padding: '10px',
    border: '1px solid red',
    cursor: 'pointer'
  };

  let persons = null;
  if (showDiv) {
    persons = (
      <div>
        {
          personsState.persons.map((person, index) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                key={person.id}
                click={() => deletePersonHandler(index)}
                changed={(event) => nameChangeHandler(event, index)} />
            )
          })
        }
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Hi, this is a react app</h1>
      <button style={buttonStyle} onClick={switchView}>Toggle</button>
      {persons}
    </div>
  );
}

export default App;
