Redux
===

- An independant library to efficiently manage state
- Uses `Store, Reducers, Subscription and Actions`
- Having a clearly defined process of how your state may change

Redux Flow
---

- Central Store
	- Stores entire application state
	- A component wants to manipulate store, but is not done directly, because then it would be hard to know what broke the app. Also, React won't be able to react to such operation

- Actions
	- Actions are dispatched from javascript code or from Components in React
	- An action is an information package with some payload
	- What needs to be done
	- It doesn't hold any logic on how to update the store

- Reducer
	- Reducer actually updates the store
	- An action reaches the reducer and reducer decides what and how the store needs to be updated
	- A reducer is a pure js function that receives the action and the old state and it returns the updated state
	- Reducer has to execute only synchronous code, to keep the complexity to minimum
	- Returns the updated state
	- The new state is always created in an immutable way, keeping the old state object intact
	- This new state then replaces the central stored state 

- Subscription
	- The store triggers subscriptions whenever state is updated in the central store
	- A component can subscribe to store changes.

Connecting Redux to React
---

- Library `react-redux` is required to connect a redux store to react
- `npm install --save react-redux`
- Then wrap the `App` with `Provider` from react-redux, this will inject the redux store to the react app.

State in Containers
---

- Each container now should delegate the state management to redux
- This is done by making use of `connect` function from `react-redux`
- We need decide which slice of the state we want to have and which actions do we need to dispatch from our container
**Subscribe**
- Define `mapStateToProps` - which means how the state managed by redux should be mapped to props in this container
- This method accepts a state object (managed by redux) and returns a js object with a mapping of state properties to container props
- Now, `this.state.xxx` can be replaced with `this.props.xxx` in the container
- By doing this, we subscribed to a store state in our container in its props
Ex:
```
const mapStateToProps = state => {
    return {
        ctr: state.counter
    };
} 

export default connect(mapStateToProps)(Counter);
```
**Dispatch**
- Define `mapDispatchToProps`, that maps a dispatch function to a props property in the container
Ex:
```
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

- In a reducer, we must not mutate the original state of the store, instead create a copy of the state, update it and return it
- Redux then updates this new state to the old state

Design Patterns
---

Redux uses `Singleton Pattern` and `Observer Pattern` to manage `immutable state` and allow subscription to `observing components`

- State Tree uses Singleton Pattern
- `connect()` method uses observer pattern (components get updated when state changes)

Redux in Functional Component?
---