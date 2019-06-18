Javascript
===  

Data types in JS (5 types)
---  

- Number

- String

- Boolean

- Undefined - a variable that has not been assigned a value yet  
```
Ex.

var job;

console.log(job); // undefined
``` 

- Null  

Dynamic Typing
---
Javascript has dynamic typing, meaning the data type is automatically assigned to a variable when the data is assigned.
Variable names can only start with an alphabet or $ or _ (underscore)
Ex:
```
var 3years = 3; // Uncaught syntax error
```
Reserved keywords like : function, delete etc

Type Coercion
---
Javascript automatically converts variables of one type to another type
Ex:
```
var name = ‘John’;

var age = 28;

console.log(name + ‘ ‘ + age); // age is automatically converted from number to string because of type coercion
```
Variable Mutation
---
Javascript automatically changes the type of a variable when the assigned data is changed

Ex:
```
var age = 28; // type is number

console.log(age);

age = ‘twenty eight’; // type converted to string

console.log(‘age’);
```  

typeof operator - returns the data type of a variable/expression

Ex:
```
console.log(typeof ‘Hello World’); // string

console.log(typeof false) // boolean
```
  
Truthy and Falsy values
---
Values which return false when evaluated in an if condition are called falsy values. Ex: undefined, null, 0, ‘’, NaN

Values which are not falsy, are the truthy values

=== vs ==
---

Since javascript does type coercion, it might return true while comparing 2 variables of unequal type. To make sure that doesn’t happen, we use strict === which doesn’t do type coercion.

Ex:
```
Var height = 23;

If (height == ‘23’) { … } // returns true even though height being a number is being compared to a string. Type coercion happening

If (height === ‘23’) // returns false, type coercion stopped
```

Function Declaration vs Function Expression
--- 
```
function hello() { console.log(‘hello world’); } // function declaration
hello();
var hello = function() { console.log(‘hello world’); } // function expression
hello();
``` 
- A declaration does not return a value
- An expression in javascript always produces a value.
- Examples of declaration -> if else blocks
- Examples of expression -> typeof, console.log etc

Arrays vs Objects
---

```
var arr = [‘akash’, ‘nigam’, false, 28]; // array

var obj = { // object

firstName: ‘akash’,

lastName: ‘nigam’,

isMarried: false,

age: 28

}
```  

Arrays keep values in a fixed order, with fixed positions, can access values by using index only.

An object keeps values in key-value pairs, in no specific order and the values can be accessed by using their respective keys.  

- Access values in an array
```
console.log(arr[0], arr[1]);
```
- Access values in an object
```
Method 1 -> console.log(obj.firstName);

Method 2 -> console.log(obj[‘lastName’]);
```
- Edit array:
```
arr[0] = ‘New Value’;
```
- Edit object
```
obj.firstName = ‘New value’;
Or
obj[‘firstName’] = ‘new Values’;
``` 
- Define array:
```
var arr = [];
Or
var arr = new Array();
```
- Define object:
```
var obj = {};
Or
var obj = new Object();
```  

Object Methods
---

A function expression in an object is called a method.

Ex:
```
john = {
name: ‘john’,
calcAge: function(birthYear) {
			return 2019 - birthYear;
		}
}
```
And since only objects can have such methods, arrays are also objects because they contain methods like push and pop.

this
---

In every object, javascript gives a special keyword called `this` which represents the current object in the `context`.

Ex:

```
john : {
    name: ‘john’
    birthYear: 1990,
    calcAge: function() {
        return 2019 - this.birthYear;
    }
}
```

`this` simply means the current object in the context

Javascript Versions
---

- Release first in 1996 with the name `LiveScript`, which was renamed to `Javascipt` to attract Java developers, but they are totally different
- Submitted for standard to ECMA in 1997, - ES1
- 2015 - `ES6 or ECMAScript 2015 or ES2015` was released with a lot of features and new updates (biggest update)
- Since then, it is release every year with the name ES<Year>. Ex. ES2016, ES2017,..., ES2019 etc

Important : 
ES5 								- Supported in all browsers (Legacy Javascript)

ES6(2015), ES7(2016), ES2017, ES2018
									- Supported in all modern browsers
									- Not in older ones
									- Can be converted to ES5 in prod using transpiling and polyfilling

ES2019, ES2020						- Known an ESNext (future releases)
									- Some features already supported in modern browsers
									- Transpiling and polyfilling can be done here too for conversions to older versions

ES2015 (ES6) features
---

**Arrow Functions (ES6)**

Arrow functions provide 2 huge benefits over traditional anonymous functions 

- *Less verbose* - syntax upgrade
```
// traditional function
const sum = function(a, b) {
	return a + b;
}

// arrow function
const sum = (a, b) => (a+b);
```

- *Context Binding* : they have `this` lexical binding. Meaning, they take the `this` from their surrounding, so that we don't have to `bind()` or do 
`const that = this;`

Example using `const that = this`
```
// traditional JS
Person.prototype.get = function(res) {
	const that = this;							// Promise will have a different this, therefore, saving the this using that const
	return new Promise(function() {
		http.get(that.url, function(data) {
			resolve(data);
		})
	});
}

// arrow function
Person.prototype.get = function(res) {
	return new Promise((resolve, reject) => {		// no such need to store this now, this in Promise is now that of the get method
		http.get(this.url, function(data) {
			resolve(data);
		})
	});
}
```
Example using `bind` - function constructor
```
var john = function(name) {
	this.name = name;
	this.hello = function() {
		console.log(this);				// logs john

		setTimeout(function() {
			console.log(this);			// logs window object
		}, 1000);
	}
}
```
Fix with `bind`
```
var john = function(name) {
	this.name = name;
	this.hello = function() {
		console.log(this);				// logs john

		setTimeout(function() {
			console.log(this);			// logs john
		}.bind(this), 1000);
	}
}
```
Fix with arrow function
```
var john = function(name) {
	this.name = name;
	this.hello = function() {
		console.log(this);				// logs john

		setTimeout(() => {
			console.log(this);			// logs john
		}, 1000);
	}
}
```

**Pitfalls of arrow functions**

- Arrow functions do not bind `this`, instead they use the `this` in their scope.
- Arrow functions can't be used as instance methods, because they can't bind to the instance, and end up binding to the global instance
```
var john = {
	name: 'Akash',
	hello = () => {
		console.log(this);				// logs window object
	}
}
```
- Function expressions are best for object methods. Arrow functions are best for callbacks or methods like map, reduce, or forEach.
- https://medium.com/tfogo/advantages-and-pitfalls-of-arrow-functions-a16f0835799e

ES2018 Feature
---

- Spread Properties(introduced in ES6)
	Create a clone of an object with additional new properties

	Previously: 
	```
	const warriors = {abc: 23, pqr: 56};
	const newWarriors = Object.assign({}, warriors, {
		xyz: 76
	});
	```
	In ES2018:
	```
	const warriors = {abc: 23, pqr: 56};
	const newWarriors = {
		...warriors,
		xyz: 76
	}
	```

- Rest Properties (Introduced in ES6)
	Destructure an object to find remainder

	Previously:
	```
	const calcWin = (warriors) => {
		const {abc, pqr, xyz} = warriors;	// getting properties out - destructuring
		const remaining = _.omit(warriors, [abc, pqr, xyz]); // getting remaining properties
	};
	```

	In ES2018
	```
	const calcWin = (warriors) => {
		const {abc, pqr, xyz, ...remaining} = warriors;	// getting properties out and remaining in one command
	};
	```

	Also, in ES2018, this can be moved in the method header
	```
	const calcWin = ({abc, pqr, xyz, ...remaining}) => {
		// Same as above, no need to declare anything else. At this point, all the variables are set with their respective values
	};
	```

- Promise.prototype.finally
	ES2018 introduced finally block in promises.

	Previously:
	```
	let connection;
	db.open()
		.then((conn) => {
			connection = conn;
			return connection.select({name: 'jane'});
		})
		.catch(() => { ... })
		.then(() => {
			connection.close();
		});
	```

	In ES2018:
	```
	let connection;
	db.open()
		.then((conn) => {
			connection = conn;
			return connection.select({name: 'jane'});
		})
		.catch(() => { ... })
		.finally(() => {
			connection.close();
		});
	```
	Differnce between `then()` and `finally()`
	- If there was an error in the catch block, then() will not be called
	- If there was an error in the first then() block, then() will not be called
	- Value gets automatically passed from first then to finally
	- Finally gets called always - similar to try/catch/finally

- Template Literal Revision
- Asynchronous iteration
- RegExp named catpture groups


ESNext Features
---

- Optional Catch Binding (Stage 4)
	No need to declare the exception in a catch block

	Previously:
	```
	let jsonData;
	try {
		jsonData = JSON.parse(str);
	} catch(ex) {
		jsonData = DEFAULT_DATA;
	}
	```

	In EXNext:
	```
	let jsonData;
	try {
		jsonData = JSON.parse(str);
	} catch {
		jsonData = DEFAULT_DATA;
	}
	```

- Static properties, instance properties and private methods in Classes (Stage 3)
	
	Previously:
	- Static properties were defined outside class scope
	- Instance properties were hidden inside constructor
	- Private methods were defined with an underscore, but JS will run these when accessed from outside

	```
	class SelectField extends React.Component {
		constructor(props) {
			super(props);
			this.state = { ... };			// instance property inside constructor
		}
		_getOptions() { ... }				// private methods having _ 
		render() {
			const opt = this._getOptions();
		}
	}
	SelectFiels.propTypes = { ... };		// static fields outside class scope
	```

	In ESNext:
	- Static properties defined inside class scope
	- Instance properties now outside constructor, thereby removing the need to have a constructor
	- Private methods start with a hash(#), JS gives error at runtime if these are accessed outside class

	```
	class SelectField extends React.Component {
		statis propTypes = { ... };			// static fields inside class scope
		state: { ... };						// instance properties defined outside constructor, constructor doesn't HAVE TO BE there
		#getOptions() { ... }				// private methods having # (checked at runtime) 
		render() {
			const opt = this._getOptions();
		}
	}
	```
	- In above example, value of instance property `state` gets initialized before the constructor is called.

- Optional Chaining (Stage 1)
	Null/undefined checks can be now removed to give way to optional chaining using `?.`

	Previously:
	```
	const address = user != null ? user.address : undefined;
	const street = user != null ? (user.address != null ? user.address.street : undefined) : undefined;
	```

	Proposed:
	```
	const address = user?.address;
	const street = user?.address?.street;
	```

	Works for methods and functions too:
	
	Previously:
	```
	user && user.update();		// if user exists, then call update method of user
	update && update();			// if update exists, then call update
	```

	Proposed:
	```
	user?.update();				// if user exists, then call update method of user
	update?.();					// if update exists, then call update
	```

Javascript - behind the scene
---

- A Javascript Engine is a interpretor.
- The code is first parsed and checked for errors.
- If everything is okay, it is converted to machine code
- The code is then run on the computer's processor

Execution Context
---

- Environment where a javascript code is run - a global context
- Stores variables and our code.
- Variables and functions which are not part of any functions become members of this global context object - the Execution Context
- This object in browsers is the `window` object
- So all variables become part of the global object.
	Ex: 
	```
	var lastname;					// declared variable
	lastname === window.lastname 	// true, since both are same
	```
- Every function call creates a new Execution Context for that function and variables are then stored in that particular execution context and not in the global context.
	Ex:
	```
	var name = 'Akash';				// global context variable
	function hello() {				// global context function
		var age = 28;				// function hello() context variable
	}
	hello();						
	```
- When a new function is called, a new execution context is put on top of the execution stack.
- When the function returns, the execution context of that method is popped from the stack

Execution Context Object
---

- A execution context object is created for an execution context
- It has 3 properties
	- Variable Object(VO) - containing function arguments, inner variable declarations and function declarations
	- Scope Chain - containing current VOs and parent VOs 
	- `this` variable
- When a function is called, a new exec. context is put on top of exec. stack happening in 2 phases
	- Creation Phase :
		- Creation of VO
		- Creation of the scope chain
		- Creation of this variable
	- Execution Phase :
		- Code of the function is ran line by line

Creation of VO (`Hoisting`)
---

- In the creation phase, the first step is the creation of VO, which contains following properties
	- The `argument` object is created containing all the arguments passed into the function
	- For each function in the context function, a property is created that points to it
	- For each variable in the context function, a property is created and is set to undefined
	- The above 2 steps of creation of properties for variables and functions is called `Hoisting`
	- In Hoisting, properties for `declared variables are undefined` and properties for `declared functions are pointers` to those functions.

	Hoisting for functions:
	- Since a function is already processed even before the execution starts, it does not matter whether that function is called before or after the declaration.
	Ex:
	```
	hello();							// no error, since the function has already been read during the VO creation phase
	function hello() {
		console.log('Hello World');
	}
	hello();							// no error anyway, function declared and processed
	```

	- But the same is not true for function expressions.
	- Hoisting only works for function declarations.
	Ex:
	```
	hello();							// Error!, hello() has not been creted yet because hoisting doesn't work for function exps
	var hello = function() {
		console.log('Hello World');
	}
	hello();							// no error, since the function has already been processed (without Hoisting)
	```

	Hoisting for variables:
	- In the creation phase, a variable will be undefined because of the hoisting
	Ex:
	```
	console.log(age);					// undefined (but js knows that a variable with that name exists)
	var age = 28;
	console.log(age);					// 28
	```

	- When the variable is not defined, no hoisting happens and we get an error
	Ex:
	```
	console.log(age);					// error!
	```

	- Hoisting works for individual Execution Contexts.
	- Biggest takeaway - we can use functions even before they are declared in the script, because of hoisting!!!

Scope Chaining
---

- Scope means where can we access a certain variable
- In javascript, only a function creates a new scope (as opposed to if/else, while, for loop etc in other languages)
- `Lexical Scoping` - A function written lexically within other function gets the scope of the outer function
- Meaning, the inner scoped function gets access to parent's variables and functions
	Ex:
	```
	var a = "hi";							// global scope variable - VOg
	first();
	function first() {						// global scope function first - (VOg + VOf) 
		var b = "hello";					// first scope variable
		second();
		function second() {					// first scope function second - (VOg + VOf + VOs)
			var c = "hey";					// second scope variable 
			console.log(a + b + c);			// hihellohey
		}
	}	
	```
- Scope works one way only - bottom to top
- So during the creation phase, this scope chain property is set

**Execution Stack vs Scope Chain**

- Execution stack is created based on one function calling another function, it has nothing to do with accessing variables
- Scope chain decides where a variable can be accessed and methods which are lexically written within other functions get the scope of the parent function.

Ex:
```
var a = "hello";				// global execution object variable
first();						// can be called because of hoisting

function first() {				// global scoped function first
	var b = "hi";				// first scoped variable
	second();					// hoisting

	function second() {			// first scoped function second 
		var c = "hey";			// second scoped variable
		third();				// hoisting at global execution stack
	}
}

function third() {				// global scoped function third
	var d = "wave";				// third scoped variable
	console.log(c);				// error! because var c is not in scope of third
	console.log(a, d);			// runs, because both vars are available in the scope
}
```

`this` variable
---

- the `this` object refers to the global execution object (window) when used in a `regular function`
- the `this` object refers to the object when it is used in a object method.
- Important : In an object method, even an inner regular function when uses `this` - it refers to the global execution object - window

Ex:
```
function hello() {								// regular function - global execution scoped function hello
	console.log(this);							// this = window object
}

var john = {									// global execution object scoped john object
	name: 'john',								
	birthYear: 1990,
	calcAge = function() {						// object method
		console.log(2019- this.birthYear);		// this = john object

		function innerFunction() {				// regular function john scoped
			console.log(this);					// this = window object (global execution object)!!!
		}
		innerFunction();
	}
};
```

- `this` variable is only assigned value when the object calls the method!!!
Ex: (using method borrowing -> declare a method in an object borrowed from another object)
```
var john = {
	name: 'John',
	birthYear: 1990,
	calcAge = function() {
		console.log(this);							// logs John object
		console.log(2019 - this.birthYear);			// logs 29
	}
}

john.calcAge();

var mike = {
	name: 'Mike',
	birthYear: 1993
}

mike.calcAge = john.calcAge;						// method borrowing (calcAge in Mike is now what calcAge in John)
mike.calcAge();										// logs Mike object and then logs 26
```

- The above shows how this in calcAge in john object is replaced with this in mike, when borrowed
- Meaning, the `this` object in a method gets assigned with a value only when the method is called/ran

Event Loop
---

- Javascript is a single threaded language
- JS uses `Event Loop` mechanism to handles anyc operations (ex timeout)

**How it works**

- It works on Event Table and Event Queue and Execution Stack
- When it encounters any async operations, js adds it to the `Event table`
- Once that event occurs (timeout, click, mouse move), Event Table sends the event to the `Event Queue`.
- Event Table does not call the function, but only sends the notice to the Event Queue
- `Event Queue` is simply queue datastructure, that only holds the events that need to be executed in the correct order (queue)
- `Event Loop` is a constantly running process that checks if the `Execution Stack` is empty.
- If it is empty, it checks the Event Queue for any pending events
- If there are any events, they are moved to the Execution Stack, if not, nothing happens.

Ex:
```
var john = {
	name = 'John',
	hello: function() {
		console.log(1);

		setTimeout(() => {
			console.log(2)
		}, 0);

		for (let i = 0; i < 100000; i++) {
			console.log(3);
		}
	}
};

// output
1
3 // 100000 times
2
```

In above example, only when the execution stack got empty (for loop ran for 100000 times), only then the waiting event was executed

DOM
---

- Document Object Model - the html!
- Object that gives access to the dom = `document` object. And we call different methods of this object to manipuate the dom from the javascript.



