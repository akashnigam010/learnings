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

Functional Components with React Hooks (useState) - State Management
---

*Hooks are functions that let us “hook into” React state and lifecycle features from function components*

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

Manipulate string chars
---

```
const text = 'Hello World!',
const arr = text.split(''); 		// converts to array
```

Dynamic Styling
---

- Change the class array dynamically and then assign that array with `join(' ')` to `style`
Ex:
```
const classes = [];
if (personsState.persons.length <= 2) {
	classes.push('red');						// .red style in css class
} 

if (personsState.persons.length <= 1) {
	classes.push('bold');						// .bold style in css class
}

<p className={classes.join(' ')}>Assignment Input</p>
```

Error Boundary
---

- When a component might throw some error (api call etc), use ErrorBoundary to wrap the component (HOC) to show custom message on the UI

App Structure
---

- Keep the presentation components under `components` folder
- Assets under `assets` folder
- Smart components or container under `containers` folder
- Functional components can ommit `return ()`, by simply making use of arrow function's direct notation

Class vs Functional Components
---

- Class based comps can manage state and component lifecycle
- Functional comps can't manage state until React 16, post to that they can manage state using `useState` lifecycle hook
- Functional comps can't manage component lifecycle

**Lifecycle Hooks are different thant React hooks**

Component Lifecycle
---

**Creation**

1. constructor(props)
	- Called during comp construction.
	- Set initial state
	- Do not add code that causes side effect like making an http call etc
	- If a constructor is added, `super(props)` need to be called.
	- If no constructor is added, the above super call is made automatically by React

2. static getDerivedStateFromProps(props, state)		// added in React 16.3
	- When props of a comp change, and if you need to update the internal state, then use this hook
	- Very rarely used
	- No causing http calls etc

3. render
	- Prepare and return JSX
	- No blocking operations (http, timeouts)

4. Render child components
	- All the child components will get rendered with their respective lifecycles
	- Flow comes back to current component

5. componentWillMount()
	- Will be removed from future releases
	- Not used anymore

6. componentDidMount()
	- Cause side effect - make http calls, timeouts
	- Do not update state synchronously (it will trigged re-render cycle - affects performance)
	- State can be updated async as a result of a promise (`then` block)

7. componentWillUnmount()
	- Called when component is about to be destructed

**Updation**

1. static getDerivedStateFromProps(props, state)		// added in React 16.3
	- When props of a comp change, and if you need to update the internal state, then use this hook
	- Very rarely used
	- No causing http calls etc

2. shouldComponentUpdate(nextProps, nextState)
	- Decide whether a component should update or not - may cancel comp update
	- Powerful as it can break the component
	- Or optimize the component's performance - compare the nextProps.xxx to this.props.xx and if there is a change, only then let the componen update, hence optimizing the app.
	- **React doesn't always update the whole DOM tree, it compares the old and the new states and if anything has really changed, it updates the changed DOm**

3. render()

4. Update child components
	- All the child components will go through the update lifecycle in same pattern

5. getSnapshotBeforeUpdate(prevProps, prevState)
	- Used for last minute dom operations
	- Example getting the scroll position of the user right before update
	- do not cause side effects (http, timeouts)
	- return data that can be used in componentDidUpdate

6. componentDidUpdate(prevProps, prevState, snapshot)
	- Cause side effects
	- Do not update state synchronously (it will trigged re-render cycle - affects performance)
	- State can be updated async as a result of a promise (`then` block)


useEffect() - Lifecycle Management
---

- In functional components, we do not have Lifecycle events to manage the component
- Instead, we have a `useEffect()` React hook from react library as a replacement for the lifecycle events

```
useEffect(() => {
	console.log('[Cockpit.js] useEffect');
	// make an http call
});
```
- The above arrow function will be called at every render cycle
- In order to make it run only for the first time when the component loads, pass an empty array as the second argument
```
useEffect(() => {
	console.log('[Cockpit.js] useEffect');
}, []);
```
- This will run the function only when this component loads the first time, thus giving the replacement for `componentDidMount`
- In the array, we can pass some props data. So when that data changes, this function is called at that time, thus giving the replacement for `componentDidUpdate`
```
useEffect(() => {
	console.log('[Cockpit.js] useEffect');
}, [props.persons]);
```
- We can also return a function from the useEffect, that can be used to do some cleanup work when the useEffect runs (but before running the main arrow function), thus giving the replacement for `componentWillUnmount`
```
useEffect(() => {
	console.log('[Cockpit.js] useEffect');
	return => {
		console.log('[Cockpit.js] useEffect')
	}
}, []);
```

Component Optimization
---

**Class based components**
- Using `shouldComponentUpdate()`, we can optimize our app.
- Use this method to return `true` only in case of dependant props.state getting updated. 

**Functional components**
- Simply wrapping the component in `React.memo(...)` keeps the snapshot of the component in memory, and is returned back if the props over which this functional component dependes, doesn't change.

**Important**
When it is known that the data WILL change in parent and therefore child WILL update, then adding shouldComponentUpdate() or React.memo() will add extra load and slow down the app. So optimize only when it is required.

Pure Component
---

- In a class based component, we optimize the render cycles using the shouldComponentUpdate
- In this method, we check if any property or method in the state has changed, then update the component.
- This check can be long and heacy if we start doing it for all the properties and methods.
- So instead of manually making these checks, we can simply extend `PureComponent` instead of `Component` from `react`.
- PureComponent already has shouldComponentUpdate method implemented with all the properties and methods checked for change.

How React updates DOM
---

Virtual DOM : React keeps a copy of DOM as javascript model in memory called Virtual DOM

- When render method runs, react compares the old virtual DOM to the new Virtual DOM
- If no difference is found, nothing is done - no changes to the real DOM
- If a difference is found, react updates only the changed part in the real DOM
- It is important that react only updates the part that was changed because updating the real DOM is really slow.
- When a render method runs, it doesn't mean that the real DOM will change.
- It could be the possibility that the render method did run because some state changed, but finally the new virtual DOM was still same as the old virtual DOM. In such case, react will not update the real DOM.

Rendering adjacent JSX element
---

**Method 1**
- On root level, there is only one element allowed in a render method (ex. a div)
- But react allows an array to be returned, as long as all the items have a key (ex. returning props.persons.map(...))
- So, if instead of a single value, we return an array, we can put adjacent elements in a JSX
Ex:
```
render(
	return [
		<p key="i1">Hello</p>,
		<p key="i2">How are you</p>,
		<p key="i3">Good morning</p>
	];
);
```
- Only catch is that all the array elements must have a key

**Method 2 - Using Wrapper Component - HOC**
- Simply wrap your JSX with a HOC or a wrapper compnent
- React requires us to return just only element as JSX (or array)
- So we can wrap our JSX element (multiple) in an auxillary component which is called a wrapper or a Higher Order Component and return that.
- By doing this, we do not have to add any extra divs to our JSX

Ex:
1. Declare a HOC
```
const Auxillary = props => props.children;
export default Auxillary
```
- No need to import `React` because we do not return any JSX from an hoc
- `children` is a property of props and hoc returns `props.childeren`, meaning - return anything between the opening and the closing tag of the hoc

2. Use it to wrap the JSX
```
render() {
	return (
		<Auxillary>
			<p>Hello</p>
			<p>How are you</p>
			<p>Good morning</p>
		</Auxillary>
	);
}
```
- key is not required now since it is not being returned as an array

**Method 3 - Using React.Fragment - HOC**

- Use built in HOC for the same purpose `React.Fragment`
Ex:
```
import { Fragment } from 'react';
render() {
	return (
		<Fragment>
			<p>Hello</p>
			<p>How are you</p>
			<p>Good morning</p>
		</Fragment>
	);
}
```

HOC
---

- HOCs are a cross-cutting way to add features or business logic to components by wrapping them
- **They take in a component and return an enhanced component**
- Conventionally, defined with a `with` keyword example - withClass.
- Defined in such a way that they can be reused across multiple components
- Used in such a way that the component should be reusable even without the HOC
- Are defined as normal javascript functions taking 1 or more arguments
	- The first argument is the Wrapped Component - that needs to be wrapped
	- Other arguments depend on what business logic we are adding in the HOC
Ex:
```
const withClass = (WrappedComponent, classes) => {
	return props => {
		<div className={classes}>
			<WrappedComponent {...props} />
		</div>
	}
}

export default withClass;
```
Usage:
```
const Person = props => {
	return (
		<p>I am a person</p>
	);
}

export default withClass(Person);		// wrapping a component to return an enhanced comp
```

- Do not mutate the Wrapped Component inside an HOC, because then the Wrapped Component has a dependant business logic on HOC and it can't be used independantly


Setting State Correctly
---

- When we want to update state, and the new value is dependant on old value, never use 
`this.setState({val: this.state.val + 1});`
- Because it is not for certain that the state will be upudated after this statement.
- React will register this update and will change the actual state as and when resources are available.
- Therefore, whenever such situation arises, set state by passing the new state with a callback function
Ex:
```
this.setState((prevState) => {
	return {
		val: prevState.val + 1 
	}
});
```

PropTypes
---

Additional library to define what are the types of props a component uses
Ex:
```
import PropType from 'prop-types';
.
.
.
Person.propTypes = {
	clicked: ProTypes.func,
	name: PropTypes.string
};

export default Person;
```

Refs
---

- To get hold of a HTML/JSX element, we can use `ref` attribute.
- We can then manipulate the element in different part of our app.
Ex:
```
class Person extends Component {
	constructor(props) {
		super(props);
		this.inputElementRef = React.createRef();
	}

	componentDidMount() {
		this.inputElementRef.current.focus();
	}

	render() {
		return (
			<input ref={this.inputElementRef}>
		);
	}
}
```

Refs in functional components
---

We can do the same thing in functional components using `useRef` hook along with `useEffect` hook.
Ex:
```
const Cockpit = props => {
	const btnClickRef = useRef(null);

	useEffect(() => {
		btnClickRef.current.click();
	}, []);

	return (
		<button ref={btnClickRef} />
	);

};
```

Prop chain problem
---

Passing state from a component up in the component heirarcy down to other components, there is a lot of redundancy and margin of error. This is called Prop chain problem.
This is taken care in React by using Context API.


Context API
---

- Context provides a way to pass data through the component tree without having to pass props down manually at every level.
- React allows us to create a context object to pass any data to the component tree without passing from one component to another.
- Thus a context object can be said to be a globally available object that can be accessed across the component tree.
- Makes use 
	- `React.createContext()` - to create a context object, 
	- `Provider` to set up the provider and wrap the JSx that needs this context obj 
	- `Consumer` to use the context object in a component

Ex:
1. Create a context object
```
import React from 'react';
const AuthContext = React.createContext({
	authenticated: false,
	login = () => { }
});
export default AuthContext;
```

2. Add Provider
```
import AuthContext from '../../context/auth-context';
const App = props => {
	const [authenticated, setAuthenticated] = useState(false);	// false by default
	loginHandler = () => {
		setAuthenticated(!authenticated);		// toggling authenticated
	}

	return (
		<div>
			<AuthContext.Provider value={{authenticated: authenticated, login: loginHandler}}>
				<Child1 />		
				<Child2 />
			</AuthContext.Provider>		// Child1 & Child2 depend upon the context ob
				<Child3 />				// Child3 doesn't depend on it
		</div>
	);
}
```

3. Consume
*Child 1*
```
const Child1 = props => {
	return (
		<AuthContext.Consumer>
			{(context) => context.authenticated ? <p>Logged In</p> : <p>Please Log In</p>}
		</AuthContext.Consumer>
	);
}
```
*Child 2*
```
const Child2 = props => {
	return (
		<AuthContext.Consumer>
			{(context) => <button onClick={context.login}>Login</button>}
		</AuthContext.Consumer>
	);
}
```

ContextType and useContext
---

- If we need to use the context object outside our JSX code, we couldn't, because we use it by <AuthContext.Consumer>
- We can do it by making use of static `contextType` in a class based component or `useContext` hook in a functional component.

*ContextType*
Ex:
```
class Person extends Component {
	static contextType = AuthContext;		// need to define this
	componentDidMount() {
		console.log(this.context.authenticated);	// react provides this.context
	}

	render() {
		return (
			{this.context.authenticated? <p>LoggedIn</p> : <p>Login pls</p>}
		);
	}
}
```
- In above example, we need to define a `static` property in our class based component with the name `contextType`.
- By doing that, react provides us with a `context` object in our class that will hold the context object.

*useContext*
Ex:
```
const Person = props => {
	const authContext = useContext(AuthContext);
	console.log(authContext.authenticated);

	return (
		<button onClick={authContext.login}>Login</button>
	);
}
```

useEffect Hook
---

- `useEffect` lets us perform side-effects in a functional component
- It is a combination of `componentDidMount, componentDidUpdate and componentWillUnmount`
- It provides a way to put the cleanup logic along with the subscription logic and guarantees the cleanup after a prop has changed
- Comparing this to class based componentDidMount and componentWillUnmount, we have to split the related code into 2 different lifecycle methods
- If a prop has changed, componentDidUpdate needs to be implemented, or we end up having bugs - stale state being shown
- In useEffect, React will automatically re-render and clean up the last prop state with a new one.
- In class based lifecycle comps, we can optimize the render cycle using `shouldComponentUpdate`, in useEffect, it is built right into it as a second argument
- Pass a second argument to tell React to render this only when the argument is updated.
- Passing an empty [] as a second argument essentially renders it only on the first render.

There are 2 effects
1. Effects without cleanup - example: DOM update, network calls, log statements
	These effects do not require cleanup and therefor, useEffect do not need to return a cleanup function
2. Effects with cleanup - example: subscription to an external data source
	These effects need to cleanup the subscription when re-render happens to avoid memory leak and crash at runtime

- In class based components, unrelated code ends up in a single method since there could only be one `componentDidUpdate, componentDidMount or componentWillUnmount`
- We can use useEffect multiple times since it is only a function call. And by doing this, we can club the related code in a single use of useEffect.
Ex:
```
function FriendStatus = props => {
	const [isOnline, setIsOnline] = useState(null);

	useEffect(() = {
		function handleStatusChange(status) {
			setIsOnline(status.isOnline);
		}

		ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
		// cleanup
		return () => {
			ChatAPI.unsubscribeToFriendStatus(props.friend.id, handleStatusChange);
		}
	});

	return (
		isOnline ? 'Online' : 'Offline'
	);
}
```

Custom Hooks
---

- Hooks are functions that let us `hook into` React state and lifecycle features from functional components
- Hooks are a way to reuse stateful logic, not state itself
- Building our own hooks lets us extract a component logic into reusable functions
- A custom Hook is a JavaScript function whose name starts with `use` and that may call other Hooks

- For the above example - `FriendStatus`, we can extract the state logic into a hook and then reuse it across multiple components

*Creating the hook*
```
const useFriendStatus = (friendId) => {
	const [isOnline, setIsOnline] = useState(null);

	useEffect(() = {
		function handleStatusChange(status) {
			setIsOnline(status.isOnline);
		}

		ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
		// cleanup
		return () => {
			ChatAPI.unsubscribeToFriendStatus(props.friend.id, handleStatusChange);
		}
	});

	return isOnline;
}
```
*Using in FriendStatus*
```
function FriendStatus = props => {
	const isOnline = useFriendStatus(props.friend.id);

	return (
		isOnline ? 'Online' : 'Offline'
	);
}
```
*Using in FriendListItem* - another component
```
const FriendListItem = props => {
	const isOnline = useFriendStatus(props.friend.id);

	return (
		<li style={{color: isOnline ? 'green' : 'red'}}>
			{props.friend.name}
		</li>
	);
}
```