Typescript
===

- Typescript is typed javascript
- A wrapper around vanilla js, which is compiled to js
	Command to compile a ts file to js file
	```
	tsc script.ts
	```
- Strongly typed
- Additonal features which are not in js - Interfaces, Generics etc

**tsconfig.json**
- Created after running `tsc --init`
- Creates this file bringing the current project under TS compilation scope.

- Javascript has `dynamic types`, whereas typescript has `static types` (non-chang-able);

any
---

- If a variable is not explicitly type defined, TS treats it as `any` type, and won't give compile time error if assignment is mixed with 2 different types.
Ex:
```
let age;			// equivalent to let age: any;
age = 28;			// no compile error
age = '28';			// no compile error
```
- This basically defaults to javascript's dynamic typing.
- So avoid using it.

Explicit Typing
---

```
let age: number;
age = 28;			// no compile error
age = '28';			// compile time error
```
```
let arr: any[] = ['asd', 'pqr'];	// any type but only array
arr = [100];		// no error
arr = 100;			// error
```

Tuples
---
- We can assign mixed datatypes in an array in javascript
	`let address = ["Vivek Khand", 239];`
- The above compiles perfectly in both js and ts
- But if we want to bind the type in this array, we can make use of tuples
```
let address: [string, number] = ["Vivek Khand", 239];		// compiles
let address: [string, number] = [239, "Vivek Khand"];		// error during compilaton
```

Enums
---

- Enums are string types
- Used to define strong typing and avoid typos 
```
enum Color {
	Gray,			// assigned 0		
	Green,			// assigned 1
	Blue 			// assigned 2
}

let myColor: Color = Color.Green;
console.log(myColor);			//	 logs 1
```

We can override the default assigned values ourselves
```
enum Color {
	Gray,			// assigned 0		
	Green = 100,	// assigned 100
	Blue 			// assigned 101
}

let myColor: Color = Color.Green;
console.log(myColor);			//	 logs 100
console.log(Color.Blue);		//	 logs 101
```
- The next enum value continues with its previous value 

Functions args and return values
---
- With return
```
function getAge(): number { 	// must return a number
	return 20;
}
```

- Void
```
function getAge(): void { 	// must not return anything
	console.log('hi');
	return 20;				// compile error
}
```
- Arguments
```
function add(value1: number, value2: number): number { 	// must pass both numbers and must return a number
	return value1 + value2;
}
```

Function Types
---

- Just like any other type, we can also assign a type of function.
- Meaning, which type of function can be assigned to a variable.

Ex: Without Function Type
```
function sayHello(): void {
	console.log('Hello');
}

function add(val1: number, val2: number): number {
	return val1 + val2;
}

let myFunction;							// a new variable of any type declared
myFunction = sayHello;					// myFunction assigned with sayHello function
myFunction();							// logs: Hello
myFunction = add;						// myFunction now assigned with add function
console.log(myFunction(5, 6));			// logs 11
```
- In the above, the same variable was being assigned different functions of totally different format - one that says hello and another an arithmetic function.
- We can declare in TS, which type of function can be assigned to a variable using `function types`.

Ex: With function types

```
function sayHello(): void {
	console.log('Hello');
}

function add(val1: number, val2: number): number {
	return val1 + val2;
}

let myFunction: (a: number, b: number) => number;			// variable that can only be assigned with a function that takes 2 																		// numbers and returns a number
myFunction = sayHello;					// compile time error!
myFunction = add;						// myFunction now assigned with add function, since that follows the defined pattern
console.log(myFunction(5, 6));			// logs 11
```

Object Typing
---

- Objects are automatically typed by TS based on their definition
Ex:
```
let user = {			// a new use object is created with type Object having properties name(stirng) and age(number)
	name: 'john',
	age: 28
}

user = {};				// compile time error, name and age are missing

user = {				// compile time error, name and age missing (names of the properties are important when it comes to obj typing)
	a: 'john',
	b: 28
}
```
Explicitly defining type for objects:

```
let user: {name: string, age: number} = {
	name: 'john',
	age: 28
}
```

Type aliases
---

- Defining a custom type using alias and then reusing it.
- Created using `type` keyword
Ex:
```
type Complex = {data: number[], option: (all: boolean) => number[]};

let complex1: Complex = {
	data: [1,2,3,4],
	option: function (flag: boolean) {
		return this.data;
	}
}
```

Union Types
---

- Instead of typing a variable with just one type, we can type it with more than one type using `union types`
- A pipe symbol is used to do this

Ex:
```
let age: number | string;
age = 28;			// no error
age = '27';			// no error
age = true;			// error !
```

never
---

- When a function throws an error, meaning that this function will never return, it can be typed with `never` type

Ex:
```
function neverReturns(): never {
	throw new Error('Any error');
}
```

null
---

let abc: number | null;
abc = 12;		// no compule error
abc = null;		// no compile error


ES6 and Typescript
===

Arrow Functions (ES6)
---

Traditional JS
```
const multiply = function(val1, val2) {
	return val1 * val2;
}

multiply(1, 4);
```

Using ES6 Arrow function
```
const multiply = (val1, val2) =>	return val1 * val2;

multiply(1, 4);
```

In typescript
```
const multiply = (val1: number, val2: number): number =>	return val1 * val2;

multiply(1, 4);
```

Default Params
---

```
const countdown = (start: number = 10): void => {
	console.log(start);
}

countdown();		// logs 10
countdown(20);		// logs 20
```

SPREAD Operator
---

- Converts an array into list of items
```
const numbers = [1, 56, 99, -51];
console.log(Math.max(1, 56, 99, -51));		// logs 99
console.log(Math.max(numbers))				// compile error - because Math.max(...numbers) expects a list of numbers and not an array
```
- In order to pass an array as an argument where a list is expected, use spread operator-
- A spread operator spreads an array to a list of items
```
console.log(Math.max(...numbers))				// compiles
```

REST Operator
---

- Opposite of Sread operator
- Creates an array from a list of items
```
const makeArray = function(...args: number[]) {	// expects a list, which is of type number array, meaning it gets converted 															//automatically to args array by js
	return args;
}
console.log(makeArray(1, 2, 3));				// logs [1, 2, 3]
```

Destructuring Array
---

- Destructure an array to get elements out of it.

```
const hobbies = ["Cooking", "Sports", "Hiking"];
const [h1, h2, h3] = hobbies;
console.log(h1, h2, h3);				// logs Cooking Sports Hiking
```

- Getting values out of an array into variables.
- Can also be used for destructuring objects

```
const userData = { name: 'john', age: 28};
const {name, age} = userData;					// name and age get assigned to their resp. values
```

- Important to note: The name of the variables must match with the properties of the object.
OR we can use different names of the vars using below

```
const userData = { name: 'john', age: 28};
const {name: myName, age: myAge} = userData;					// myName and myAge get assigned to their resp. values
```

Template Literals
---

- Allow us to write complex literals
- Easily embedd variables in the literals.
- Use `backticks` and `${}` 

Ex: 
```
const name = 'Akash';
const message = `Hello!
This is ${name}.
And this is so cool
`;
console.log(message);				// logs a multiline string -> Hello! This is Akash. And this is so cool
```

Classes with Typescript
---

- `public, private, protected` access modifiers are part of TS and work like any other OOPs language
- ES6 doesn't have these and everything is public
- However, ES2018 introduces these now

```
class Person {
	name: string;
	private age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}
}

const john = new Person('john', 28);
console.log(john.name);					// logs john
console.log(john.age);					// compile error - private field
```

Class Methods
---

```
class Person {
	name: string;
	private age: number;
	protected msg: string;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	printAge() {
		console.log(this.age);
	}
}
```

- We can have setters/getters for private/protected properties

Inheritence
---

- Using `extends` keyword
```
class Max extends Person {
	
	constructor(age: number) {
		super('Max', age);
		this.msg = "Hello World!";				// accessible because of protected access modifier
		console.log(this.age);					// error
	}
}
```

Getters and Setters
---

```
class Plat {
	private _species: string = 'default;

	set species(value: string) {
		if (value > 3) this._species = value;
		else this._species = 'default';
	}

	get species() {
		return this._species + 'asd';
	}
}

const plant  = new Plant();
console.log(plant.species);		// logs default
plant.species = 'Green';
console.log(plant.species);		// logs Green
```

- Getters and setters work with get and set keywords which are declared like methods but are called like properties.
- Thus the caller never knows if the property is private or not

Static properties and Methods
---

- Just like any other OOPs language, static properties and methods can be defined in TS using static keyword

```
class Helper {
	static PI: number = 3.14;
	static getTime() {
		return new Date();
	}
}

console.log(Helper.PI);					// logs 3.14
console.log(Helper.getTime())			// logs current date and time
```

Abstract classes
---

- Can not be instantiated
- Can be inherited
- Created using `abstract` keyword
- functions can be declared using `abstract` keyword too (like Java)

```
abstract class Project {
	name: string;
	age: number;
	abstract changeName: (firstName: string, changedName: string): void;		// abstract function
}

class ITProject extends Project {
	changeName(firstName: string, changedName: string): void {
		console.log(firstName, changedName);
	}
}

let itProject = new Project();		// error! can not instantiate abstract class
let itProject = new ITProject();		// compiles
```

Private Constructor and Singleton
---

- Similar to Java
- Have a private constructor
- Have a static method `getInstance()`, which calls the private constructor to instantiate an object and returns that

readonly properties
---

- Properties marked as `readonly` can not be modified

```
class Person {
	readonly name: string;

	constructor(name: string) {
		this.name = name;
	}
}

let person = new Person("Akash");
person.name = "Nigam";						// error!
```

Namespaces
---

- Logical grouping of code in TS.
- Using keyword `namespace`
- `export` function that need to be used outside the namespace

```
namespace MyNamespace {
	const PI = 3.14;

	export function calCircum(radius: number) {
		return 2 * PI * radius;
	}
}

console.log(MyNamespace.PI)					// error - PI is not exported
console.log(MyNamespace.calCircum(2));		// logs circumference
```

Modules
---

- `export` functions and constants from a .ts file
- `import` them into wherever they are required

*circle.ts*
```
export const PI = 3.14;
export function circum(r: number) {
	return 2 * PI * r;
}
```
*app.ts*
```
import {PI, circum} from './circle';	// imports from relative path

console.log(PI);						// logs PI
console.log(circum(2));					// logs circumference
```

- A module loader is required to make this work.
- Example Systemjs

**ES6 import style**
- Instead of `import {PI, circum} from './circle';`, we can use `import * as Circle from './circle';` (with an alias)
- And then use the alias to call functions/constants like `console.log(Circle.PI)`