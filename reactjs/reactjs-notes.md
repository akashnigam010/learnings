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
		- Also called presentation components or dumb components or stateless components.
		- Created by creating functions (using arrow functions)
	2. Class based components:
		- Also called containers, smart or stateful components.
		- Created by creating a `class` extending `Component` from `react` package, with a function that has a `render` method, returning a JSX

Passing Value to Components
---

- We can pass values as attributes to a Component just like html attributes
- These values are received by the component as single function argument (generally called `props`)
- This argument can be dot operated for different attribute names passed, and can give values.
- In the props object, we also receive a special property called `children`, which is represents anything between opening and closing tag of the component.