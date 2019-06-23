OOPs
===

Composition Vs Inheritence
---

- In inheritence, if the parent class's method changes, the child's inherited method also changes
Ex:
```
class Fruit {
	public int get() { ... }
}

class Apple extends Fruit {

}

class Test {
	public static void main(String ...args) {
		Apple apple = new Apple();
		int seeds = apple.get();
	}
}
```
Now, if Fruit's `public int get()` changes to `public Seed get()`, then the above client code breaks
- So it becomes difficult to change the contract/interface of the parent in inheritence.
- Also, we can weak encapsulation in Apple of get() method
- Using composition solves the problem of interface change and weak encapsulation

```
class Fruit {
	public int get() { ... }
}

class Apple {
	Fruit fruit = new Fruit();

	public int get() {
		return fruit.get();
	}
}

class Test {
	public static void main(String ...args) {
		Apple apple = new Apple();
		int seeds = apple.get();
	}
}
```

- Above, now even if Fruit changes its get() signature, the client code will still not break and we would need to fix only Apple class
- Also, now we have stronger control over what is returned from get() of Apple and thus - stronger encapsulation

