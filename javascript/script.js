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

hello();