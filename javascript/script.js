function hello() {
	console.log(this);

	var john = {
		name: 'john',
		say: function() {
			console.log(this);
			nice();
			function nice() {
				console.log('nicely');
				console.log(this);
			}
		}
	}

	john.say();

	var arr = [1, 2, 3];
	console.log(arr);
}

var Person = function(name) {
	this.name = name;
	this.hello = function() {
		console.log(this);				// logs john

		setTimeout(() => {
			console.log(this);			// logs john
		}, 1000);
	}
}

var ab = new Person('Akash');
// ab.hello();

var john = {
	name: 'John',
	hello: function() {
		console.log(this);

		setTimeout(() => {
			console.log(1);			
		}, 0);

		for (let i = 2; i<=1000; i++) {
			console.log(2);
		}
	}
};

john.hello();

class Vehicle {
	constructor(make, model) {
		this.make = make;
		this.model = model;
	}

	getMake() {
		return this.make;
	}

	getModel() {
		return this.model;
	}

	static vroom = function() {
		console.log('vroooooom');
	}
}

const corolla = new Vehicle('Toyota', 2018);
console.log(corolla.getMake(), corolla.getModel());
console.log(Vehicle.vroom());

var akash = {
	name: 'Akash',
	asd: function() {
		console.log(this);
	}
};

console.log(akash.asd());