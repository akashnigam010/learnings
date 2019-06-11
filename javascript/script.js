/*
// BMI Calculator

var john = {
	name: 'John',
	mass: 80,
	height: 2,
	calcBMI: function() {
		this.bmi = this.mass/ (this.height * this.height);
		return this.bmi;
	}
};

var mark = {
	name: 'Mark',
	mass: 90,
	height: 2.,
	calcBMI: function() {
		this.bmi = this.mass/ (this.height * this.height);
		return this.bmi;
	}
};

if (john.calcBMI() > mark.calcBMI()) {
	console.log(john.name + ' has the greater bmi');
} else if (john.bmi < mark.bmi) {
	console.log(mark.name + ' has the greater bmi');
} else {
	console.log('bmi same for ' + john.name + ' and ' + mark.name);
}

*/

// Tip Calculator

/*var johnVisit = {
	bills: [124, 48, 268, 180, 42],
	tips: [],
	finals: [],
	calcTip: function(billValue) {
		if (billValue < 50) {
			return .20;
		} else if (billValue > 50 && billValue < 200) {
			return .15;
		} else {
			return .10;
		}
	},
	finalCalc: function() {
		for (var i=0; i< this.bills.length; i++) {
			var tip = this.calcTip(this.bills[i]) * this.bills[i];
			this.tips.push(tip);
			this.finals.push(this.bills[i] + tip);
		}
		console.log(this.tips);
		console.log(this.finals);
	}
};

var markVisit = {
	bills: [77, 475, 110, 45],
	tips: [],
	finals: [],
	calcTip: function(billValue) {
		if (billValue < 100) {
			return .20;
		} else if (billValue > 100 && billValue < 300) {
			return .10;
		} else {
			return .25;
		}
	},
	finalCalc: function() {
		for (var i=0; i< this.bills.length; i++) {
			var tip = this.calcTip(this.bills[i]) * this.bills[i];
			this.tips.push(tip);
			this.finals.push(this.bills[i] + tip);
		}
		console.log(this.tips);
		console.log(this.finals);
	}
};

function calculateAverageTip(tips) {
	var sum = 0;
	for (var i=0; i< tips.length; i++) {
		sum += tips[i];
	}
	return sum/tips.length;
}

johnVisit.finalCalc();
markVisit.finalCalc();

johnVisit.averageTip = calculateAverageTip(johnVisit.tips);
console.log(johnVisit);
markVisit.averageTip = calculateAverageTip(markVisit.tips);
console.log(markVisit);*/

function hello() {
	console.log('Hi');
}

hello();
























