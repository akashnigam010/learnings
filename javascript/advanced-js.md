Advanced JS
===

Constructor/Prototype
---

- A constructor or a prototype is a blue print from which other instances can be created
- It is like a class in other programming languages like java

Prototype property
---

- Inheritence in Javascript is possible because of the prototype property that every object in javascript has
- A prototype property in a constructor/Prototype (defined above) is not the prototype property of the constructor itself, but of all the objects that are instantiated through it. Meaning, all the instances created from this constructor will have this prototype property
- We keep all the methods and properties in the prototype property of an object that we want other objects to inherit from this object.
- Every object we create is an instance of `Object` constructor.

**Important**

`__proto__` is the actual object that is used in the lookup chain to resolve methods, etc
`prototype` is the object that is used to build __proto__ when you create an object with `new`

Prototype Chaining
---

- When a certain method or property is called on an object, the search starts in the object itself and then moves up the inheritence tree using the prototype property until a method is found
- If not found - undefined is returned

**Function Constructors**
---

- Define a function constructor (prototype)
	```
	var Person = function(name, age, job) {
		this.name = name;
		this.age = age;
		this.job = job;
	}
	```
- The `this` here would refer to the global execution object - window 
- Then use this to instantiate a new object
	```
	var john = new Person('John', 28, 'Designer');
	```
- **Important** : The `new` keyword would take care to create a `NEW EMPTY OBJECT` and then instantiate it with Person properties, thus taking care of the global execution object `window` getting initialized with john's properties

Inheritence
---

```
var Person = function(name, age, job) {
		this.name = name;
		this.age = age;
		this.job = job;
		this.calcAge = function() {
			console.log(this.age);
		}
	}

var john = new Person('John', 28, 'Designer');
john.calcAge();										// logs 28

var mark = new Person('Mark', 30, 'Teacher');
mark.calcAge();										// logs 30

```

- Both objects automatically have `calcAge()` method because of it being present in the constructor object.


Adding new methods/properties to constructor
---

- Using prototype, we can add/edit methods and properties to a constructor
Ex:
```
var Person = function(name, age) {
	this.name = name;
	this.age = age;
}

Person.prototype.calcAge = function() {
	console.log(this.age);
}

Person.prototype.lastname = 'Smith';

var john = new Person('John', 28);
john.calcAge();								// logs 28
console.log(john.lastname);					// logs Smith
```

- Even though the constructor didn't have the method `calcAge()` or property `lastname`, these were added to it using its prototype property and then the objects instantiated from this constructor can automatically have these method and property attached to them. :)


Object Constructor Methods
---

- `hasOwnProperty()`
	Returns true if the property is defined in an object itself and is not from the prototype
	Ex.
	``` 
	john.hasOwnProperty('name');			// true
	john.hasOwnProperty('lastname');		// false
	```

- `instanceof`
	Returns if an objcet is an instance of a constructor
	Ex. 
	```
	john instanceof Person					// true
	```

Array as an object
---

- In javascript, arrays are objects as well
- Inspecting an array gives following:
	```
	var x = [1, 2, 3];
	console.info(x);
	```
	logs :
	```
	{
		0: 1,
		1: 2,
		2: 3,
		length: 3,
		_proto_: Array[0]
	}
	```
- Meaning, an array is an object with property `length`
- And is an instance of `Array` function constructor (Array in return extends Object function constructor)
- This is built right into javascript.

**Object.create()**
---

- Objects can also be created using `Object.create()`
- Object.create inherits directly from the object that we pass
Ex:
```
var personProto = {
	calcAge = function() {
		console.log(this.age);
	}
}

var john = Object.create(personProto, {
	name: { value: 'John' },			// notation is to pass as value
	age: { value: 28 }
});

john.calcAge();							// logs 28
```
- In here, john will inherit the calcAge from the personProto object, which is not a constructor, but an instance/object too.

Primitive vs Objects
---

- A declared primitive actually contains the value assigned to it.
- A declared object variable contains the reference to an object

Ex: Primitives
```
var a = 46;
var b = a;
a = 55;
console.log(a);		// logs 55
console.log(b);		// logs 46 - holds the original value - therefore mutation of a didn't affect the value of b
```

Ex: Objects
```
var ob1 = {
	age: 26
}
var ob2 = ob1;
ob1.age = 23;

console.log(ob1.age);		// logs 23
console.log(ob2.age);		// logs 23 - ob2 held the reference of ob1, therefore mutation affected its value
```

First class functions
---

- A function is an instance of Object type
- A function behaves like an object
- We can store a function in an object
- We can pass a function as an argument to a function
- We can return a function from a function
- This is why we have first class functions!

Ex: Passing as arguments

```
function calcArray(arr, fn) {				// generic function
	var arrRes = [];
	for (var i=0; i<arr.length; i++) {
		arrRes.push(fn(arr[i]));
	}
}

function calcAge(el) {						// callback function to calculate age
	return 2019 - el;
}

function isFullAge(el) {					// callback function to calculate isFull age
	return el >= 18;
}

var years = [1990, 2001, 1967];
console.log(calcArray(years, calcAge));		// no parenthesis, since we are passing a callback function later by calcArray
console.log(calcArray(years, isFullAge));	// no parenthesis, since we are passing a callback function later by calcArray
```

Ex: Returning functions

```
function interviewQuestion(job) {									// generic function
	if (job === 'designer') {
		return function(name) {										// returning a function
			console.log(name + ', what is UX?');
		}
	} else if (job === 'teacher') {
		return function(name) {
			console.log(name + ', what is teaching?');
		} 
	} else {
		return function(name) {
			console.log('Hello ' + name + ', what do you do?');
		}
	}
}

var teacherQuestion = interviewQuestion('teacher');					// similar to function expression
teacherQuestion('Akash');											// Akash, what is teaching?

interviewQuestion('designer')('Mark');								// Mark, what is UX?
```

IIFE: Immediately Invoked Function Expressions
---

- We declare a function `function func() { ... }` and invoke it by `func()`
- If we make use of IIFE, we don't have to declare and call separately, we do it in one go.
Ex: Normal Function
```
function func() {					// declaration
	var score = Math.random();
	console.log(score);
}
func();								// call
```
Using IIFE:
```
(function func() {					// declaration and call = IIFE
	var score = Math.random();
	console.log(score);
})();
```
Using arguments:
```
(function func(el) {					// declaration and call = IIFE
	var score = Math.random();
	console.log(score, el);
})(3);

console.log(score);						// error! -> score is protected in IIFE
```

- So we get immediate invoking in IIFE
- We get data privacy as well
- No interference with global execution context
- Can not be reused - majorly for data privacy

Closures
---

- An inner function always has access to outer function's arguments and variables even after the outer function has returned/stopped execution.

Ex:
```
function hello(country) {									// outer function argument
	var msg = "Good Morning";								// outer function variable
	return function(wish) {									// inner function with arg
		console.log(msg + " " + country + ". " + wish);		// inner function makes use of outer function's args and vars
	}
}

var indiaHello = hello('India');							// outer function returned
indiaHello('Namaste!');										// logs: Good Morning India. Namaste!. Inner function still able to make 																// use of outer function's args and vars
```

- When the function hello() returns, the execution context of this function is popped out of the execution stack
- But the Variable Object and the Scope chain of hello() still remains in memory and can be acessed by inner function
- When inner function is called, a new execution context is created for it on the execution stack
- And since it is writtem lexically, it gets the VO of the outer hello function and thus access to its vars and args
- The inner function's execution context has closed-in on outer function's VO, and that is why it is called CLOSURE!

Bind, Call and Apply
---

- Functions are objects and they come loaded with few methods of their own like Bind, Call and Apply

**Bind**

- Bind is used return a PRESET function. 
- Meaning, a bind-ed function can be called without explicitly setting the arguments.
Ex:
```
var john = {
	name: 'john',
	age: 28,
	present: function(style, time) {
		if (style === 'formal') {
			console.log('Hello! I am' + this.name + 'have a good' + time);
		} else {
			console.log('Wassup people! I am' + this.name + 'have a good' + time);
		}
	}
};

var johnFormal = john.present.bind(john, 'formal');
johnFormal('morning');								// logs Hello! I am John have a good morning
```
- Bind method returns a function, store in a var
- First argument of `present` function preset to 'formal'
- The first argument of a bind method is a `this` variable.

**Call**

- The method `call` invokes the function and allows you to pass in arguments one by one using commas.
Ex:

```
function greeting(text) {
    console.log(text, this.name);
}
var customer1 = { name: 'Leo' };
var customer2 = { name: 'Nat' };

greeting.call(customer1, 'Hello');				// logs Hello! Leo
greeting.call(customer2, 'Hello');				// logs Hello! Nat
```
- The first argument to a `call` method is a `this` variable.

**Apply**

- The method `apply` invokes the function and allows you to pass in arguments as an array
Ex:

```
function greeting(text1, text2) {
   console.log(text1 + " " + this.name + " " +text2);
}

var customer1 = { name: 'Leo' };
var customer2 = { name: 'Nat' };

greeting.call(customer1, ['Hello', 'How are you?']);				// logs Hello! Leo How are you?
greeting.call(customer2, ['Hello', 'How are you?']);				// logs Hello! Nat How are you?

```
- The first argument to a `apply` method is a `this` variable.

- Call and Apply are interchangable and we can decide what to use - comma based args or array based
- Bind always returns a function which nees to be called later.