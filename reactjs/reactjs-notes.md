React JS
===

*A javascript library for building User Interfaces*

- ReactDOM.render( ... ) - single command to render an SPA
- Babel - A compiler to translate ES6+ code to be able to run on all browsers.
- Webpack - A bundler to bundle our application into minimal files.

- A react component always renders some html, or rather `jsx`. A html type code that gets trnspiled to javascript.
```
class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Hello World</h1>
			</div>
		);
	}
}
```

- The above code in jsx gets compiled to code that can also be written in React like :

```
render() {
    const h1 = React.createElement('h1', null, 'Hi, this is a react app');
    const div = React.createElement('div', { className: 'App' }, h1);
    return div;
  }
```

JSX Restrcitions
---

- `class` can not be used since it is a reservec keyword in javascript
- Therefore, `className` is used instead
- JSX expression can have only one root element

**Important**
- JSX is just a syntactic sugar for js
- It looks like HTML but it is not and during runtime, is compiled to native javascript.
- Components are the building blocks of any React application
- React is only a library to create such components.
- Therefore, a React app can be seen as `Component Tree` having one root element and infinite nested child elements

Ways to create Components
---

There are 2 ways to create components:
	1. Functional Components:
		- Created by creating functions (using arrow functions)
	2. Class based components:
		- Created by creating a `class` extending `Component` from `react` package, with a function that has a `render` method, returning a JSX

Passing Value to Components
---

- We can pass values as attributes to a Component just like html attributes
- These values are received by the component as single function argument (generally called `props`)
- This argument can be dot operated for different attribute names passed, and can give values.
- In the props object, we also receive a special property called `children`, which is represents anything between opening and closing tag of the component.

state
---

- `state` is a special object in class based components (classes that extend `Component` class)
- To be used carefully, as the as application grows, it becomes hard to manage states.

```
class App extends Component {
	state: {
		persons: [
			{ name: 'Akash', age: 28},
			{ name: 'Max', age: 29}
		];
	};

	render() {
		return (
		<div className="App">
			<h1>Hi, this is a react app</h1>
			<Person name={this.state.persons[0].name} age={this.state.persons[0].age}>Hello World</Person>
			<Person name={this.state.persons[1].name} age={this.state.persons[1].age}>Hello World</Person>
		</div>
		);
	}
}
```

- Whenever state  changes, the component will re-render and reflect the new state
- The difference to `props` is, that this happens within one and the same component - we don't receive new data (props ) from outside!

Methods in class based components
---

- Always use function expressions while defining methods in a class based components
- This is important because `this` will refer to this component, if used that way
- If not, `this` will be undefined

```
class App extends Component {
	state: {
		persons: [
			{ name: 'Akash', age: 28},
			{ name: 'Max', age: 29}
		];
	};

	switchNameHandler = () => {
		console.log('Clicked)'
		console.log(this);					// logs this App component
	}

	hello() {
		console.log(this);					// logs undefined
	}

	render() {
		return (
			<button onClick={this.switchNameHandler}>Button 1</button>
			<button onClick={this.hello}>Button2</button>
		);
	}
}
```

setState( ... )
---

- Changing a state is done through `setState()`
- If done manually, React will not recognize that
```
class App extends Component {
	state: {
		persons: [
			{ name: 'Akash', age: 28},
			{ name: 'Max', age: 29}
		],
		other: 'Value
	};

	switchNameHandler = () => {
		this.state.persons[0].name = 'Akash Nigam';		// React does not recognize this
		this.setState(
			persons: [
				{ name: 'Akash Nigam', age: 28}			// persons array will be updated with this new value
			]
		);
	}

	render() {
		return (
			<button onClick={this.switchNameHandler}>Switch Name</button>
			<Person name={this.state.persons[0].name} />
		);
	}
}
```

- `setState()` is inherited from Component class
- React changes the state object based on new value of properties passed in setState
- It won't change other properties of the state object like `other` in the above example.

**Important**
- React only recognizes 2 changes - state and props
- In above example, when the state changed, the corresponding `props` being passed into Person component also changed

Functional Components with React Hooks (useState)
---

- First we change our class based component to functional component
- `state` and `setState` are not available in a functional component, therefore we use `useState` react hook to manage state of such compoent
- `useState` return an array with exactly 2 elements
	- First element is always the state object
	- Second is a function to update that state object
	- We can destructure this into 2 different contants and then reuse in our component
	Ex
	```
	const [personsState, setPersonsState] = userState({
		persons: [{name: 'Akash', age: 28}]
	});
	...
	console.log(personsState);				// logs the persons array
	setPersonsState({						// changes the persons state with new array and additional property
		persons: [{name: 'Akash Nigam'}],
		other: 'value'
	});	```
	- 
- Important to note that setPersonsState will completely change the persons object (including `other` property in above case) - different that `setState()` in a class based component method that merges the new object with the existing state object
- We can have multiple such destructured constants to hold different states in a component, instead of having a single `state` object (like in a class based component)
Ex:
```
const [personsState, setPersonsState] = useState({
	persons: [ ... ]
});
const [otherState, setOtherState] = useState({
	other: 'some value'
});
```
Ex: - functional component with useState hook
```
const App = props => {

  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Akash', age: 28 },
      { name: 'Max', age: 29 }
    ]
  });

  const [otherState, setOtherState] = useState({
    other: 'other vale'
  });

  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        { name: 'Akash Nigam', age: 28 },
        { name: 'Max Millian', age: 29 }
      ]
    });
  }

  return (
    <div className="App">
      <h1>Hi, this is a react app</h1>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age}></Person>
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>Hello World</Person>
    </div>
  );
}
```

Stateful vs Stateless Components
---

- Components (functional or class based), which manage state are called `Stateful Components` (or smart components, or container)
- Components that do not manage state are called `Stateless Components` (or presentation comopnents or dumb components) 
- There should be less of Stateful components, which manage the data and then that data flows to all stateless components.
- That way application remains easy to understand, maintain and scale.

Passing method references to components
---

- We can pass method references to a component as attributes (props properties)
Ex:
```
<Person 
	name={personsState.persons[0].name} 
	age={personsState.persons[0].age}
	click={switchNameHandler}>						// passing method reference as attribute
</Person>
.
.
.
const Person = (props) => {
    return (
        <div>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old</p>
        </div>
    );
}
```
- Component receives the reference as a property of `props` object
- Essentially we can trigger a method in parent component from a child component - `Outputting data`.
- In order to pass args to such method references, we can use 
	- `bind` method
		Ex:
		```
		click={switchNameHandler.bind(this, 'Akash!!!')}
		```
	- Arrow function
		Ex:
		```
		click-{() => switchNameHandler('Akash!!!')}
		```
	- Arrow function is not preferred as it can cause performance hit. Use the `bind` - more effecient

2 way binding
---

- Binding an props value to an input tag
```
<input value={props.name} />
```

- Binding a typed value to callback a method in parent component
```
<input value={props.name} onChange={props.changed} />
```
Parent
```
const nameChangedHandler = (event) {
	setPersonsState({
		persons: [{
				name: event.target.value, age: 28
			}
		]
	});
}
.
.
<Person changed={nameChangedHandler}>
```

Styling
---

- Add a nes css file to your component folder - `Person.css`
- Import this into your component - `import './Person.css';`
	- Webpack will automatically include this into the final html in the <head>'s <style> tag
- Add `className` and corresponding class in css

Inline Styling (Style in Javascript)
---

- Use a local constant to store the style info wrapped in Javascript notation (`backgroundColor` instead of `background-color`)
- Then use `style` from JSX to apply this inline.
Ex:
```
const buttonStyle = {
	backgroundColor: 'white',
	padding: '10px',
	border: '1px solid red'
};
```
Use like:
```
<button style={buttonStyle}>Switch Name</button>
```
- Can't do styling like hover using this method - will be covered later

Dynamic Content - Conditions
---

- Create a state variable that will hold true/false (`showDiv`)
- On a button click, call a method that toggles the value of this flag
- Wrap the JSX that needs to be shown/hidden based on this flag with {}
- Then add the logic to show/hide the content using ternary operator inside the {}
- Since JSX is just javascript, we can put our business logic inside it 

```
const [showDiv, setShowDiv] = useState(false);		// assign initial value to false
toggle = () => {
	setShowDiv(!showDiv);
}
return 
<div>
	<button onClick={toggle}>
	{
		showDiv ? 
		<div>
			Hello
		</div> : null
	}
</div>
```
- It can get confusing with above syntax though

Handling Dynamic Content - JS way
---

- Instead of keeping the check and the JSX combined in the return/render method, we can assign the JSX to a variable
- And then use this variable to render the component
```
let helloDiv = null;
if (showDiv) {
	helloDiv = (
		<div>
			Hello
		</div>
	);
}

return 
<div>
	{helloDiv}
</div>
```

Lists
---

- Instead of a new directive for looping, since in React everything is javascript, we loop an array/list just like any other array and return JSX, which is picked by React to render.

```
const [persons, setPersons] = useState(
	persons: [
		{name: 'Akash', age: 28},
		{name: 'Max', age: 29}
	]
);

let helloDiv = null;
if (showDiv) {
	helloDiv = (
		persons.persons.map(person => {
			return <Person name={person.name} age={person.age} />
		})
	);
}
```

Pass index for array manipulation
---

```
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
  
<div>
	{
		personsState.persons.map((person, index) => {
		return (
			<Person
			name={person.name}
			age={person.age}
			click={() => deletePersonHandler(index)}
			changed={(event) => nameChangeHandler(event, index)} />
		)
		})
	}
	</div>
```