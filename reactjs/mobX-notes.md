MobX
===

**MobX makes sure that everything that can be derived from an application state, will be derived automatically**

MobX work flow: 

1. *State*
	State is the graph of objects, arrays, primitives or anything that makes up for the application data
2. *Derivations*
	Anything that can be computed automatically from the `State` comprise the derivations. Ex. any calculation, DOM update
3. *Reactions*
	Reactions are the functions that run automatically on `state` change to perform some tasks. Ex network requests
4. *Actions*
	Actions cause the state change. MobX makes sure that actions are translated to state change and corresponding derivations and reactions run synchronously

In MobX, components do not need to manually subscribe to the state changes, infact MobX does that job for us by keeping Observables and thus creating smart components which re-render whenever state changes

Redux Vs MobX
---

- Redux has single store, MobX can have multiple stores, thus we can logically group our data in MobX
- Redux store state as a plain js object, whereas MobX stores it as an Observable object. We can listen to an observable and track our changes, whereas in Redux, we have to do it manually
- Redux has immutable state object and thus we can easily revert back to previous state, whereas MobX doesn't maintain immutability