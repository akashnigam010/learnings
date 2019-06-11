Advanced JS
===

Constructor/Prototype
---

- A constructor or a prototype is a blue print from which other instances can be created
- It is like a class in other programming languages like java

Prototype property
---

- Inheritenct in Javascript is possible because of the prototype property that every object in javascript has
- A prototype property in a constructor/Prototype (defined above) is not the prototype property of the constructor itself, but of all the objects that are instantiated through it. Meaning, all the instances created from this constructor will have this prototype property
- We keep all the methods and properties in the prototype property of an object that we want other objects to inherit from this object.
- Every object we create is an instance of `Object` constructor.

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