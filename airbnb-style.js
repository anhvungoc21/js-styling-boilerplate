/* eslint-disable */
//* Styles that have no rules 
// https://github.com/airbnb/javascript

// Personal Notes:
// - When referring to a method bound to an object, say `Class#method`
// - When referring to a method bound to a class, say `Class.method`

//! Objects 
//? 1. Use computed property names when creating objects with dynamic property names
{
	const obj = {
		[some_func()]: true,
	};
}

//? 2. Group shorthand properties at the beginning of object declaration
{
	const obj = {
		name1,
		name2,
		name3: ""	
	}
}

//? 3. Do not call `Object.prototype` methods directly. Use `call`
{
	key = ""
	const obj = {}
	Object.prototype.hasOwnProperty.call(obj, key)
}

//? 4.1 Use the object spread syntax rather than `Object.assign`. 
//? 4.2 Use object rest parameter syntax to get new object with omitted properties
{
	const original = { a: 1, b: 2 }

	const copy = { ...original, c: 3 } // => copy = { a: 1, b: 2, c: 3 }
	const { a, ...omittedA } = copy // => omittedA = { b: 2, c: 3 }
}



//! Arrays 
//? 1. Use `Array#push` instead of direct assignment to add items to array
{
	const stack = []
	stack.push(1)
}


//? 2. Use the array spread syntax to copy arrays
{
	const items = []
	const itemsCopy = [...items]
}


//? 3.1. Use spread instead of `Array.from` to convert an iterable object to an array
{
	const foo = document.querySelectorAll('.foo')
	const nodes1 = Array.from(foo) // good
	const nodes2 = [...foo] // best
}

//? 3.2. Use `Array.from` to convert an array-like object to an array
// How it works: https://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
{
	const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };
	const arr1 = Array.prototype.slice.call(arrLike); // bad
	const arr2 = Array.from(arrLike); // good
}

//? 3.3. Use `Array.from` instead of spread for mapping over iterables to avoid creating an intermediate array
{
	const old = [1, 2, 3]
	const mapFunc = (x) => x + 1
	const newArr1 = [...old].map(mapFunc) // bad
	const newArr2 = Array.from(old, mapFunc)
}

//? 4. Use line breaks after open and before close brackets ONLY if array has multiple lines
{
	const arrOneLine = [[0], [1], [2]]
	const arrObj = [
		{ id: 1 },
		{ id: 2 }
	]
	const arrNum = [
		1,
		2
	]
}



//! Destructuring
//? 1. Use object destructuring when accessing multiple properties
{
	const user = { firstName: "Anh", lastName: "Vu", other: "" }
	const { firstName, lastName } = user
}

//? 2. Use array destructuring
{
	const arr = [0, 1, 2]
	const [first, second] = arr
}

//? 3. Use object destructuring for returning multiple values, NOT array destructuring
// Why?: Caller of function does not have to think about the order of return values. 
{
	function func() {
		return { left, right, top, bottom }
	}
	const { left, top } = func() 
	// [left, _, top] would be required if array destructuring is used
}



//! Strings
//? 1. Strings that cause the line to go over 100 characters should not be written across multiple lines using string concatenation
{
	const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
}

//? 2. When programmatically building up strings, use template strings instead of concatenation. Also, use no spaces around the curly braces
{
	const myName = "Anh Vu"
	const constructed = `My name is ${myName}`
}



//! Functions
//? 1. Use NAMED function expressions instead of function declarations.
// Why expressions?: Function declarations are hoisted. This harms readability & maintainability.
// Why named?: Complicated. Better clarity for compiler and call stack.
{
	const foo = function () {} // bad
	const short = function longUniqueMoreDescriptiveLexicalName() {} // good
	// lexical name is distinguished from the variable-referenced invocation(s)
}

//? 2. Never use a function declaration in a non-function block (if, while, etc.). Assign the function to a variable instead.
{
	if (true) {
		const func = function funcInIfBlock() {}
	}
}

//? 3. Never name a parameter `arguments`. This will take precedence over the `arguments` object given to every function scope.
{
	function foo(name, options, args) {}
}

//? 4. Never use `arguments`. Use rest syntax instead.
{
	// bad
	function func1(arg1, arg2, arg3) {
		const args = Array.prototype.slice.call(arguments);
		return args.join('');
	}

	// good
	function func2(...args) {
		return args.join('');
	}
}

//? 5. Use default parameter instead of mutating function arguments
{	
	// bad
	function func1(opts) {
		// REALLY bad. Can introduce bugs if opts if falsy.
		opts = opts || {}

		// still bad
		// Note: `void 0` just evaluates to undefined
		// We don't use undefined because it is not reserved and can be used as a variable name
		if (opts === void 0) {
			opts = {}
		}
	}

	// good
	function func2(opts = {}) {}
	
}

//? 6. Use spread syntax to call variadic functions
{
	const x = [1, 2, 3, 4, 5];
	console.log.apply(console, x); // bad
	console.log(...x); // good
}


//? 7. If the return expression of an arrow function spans multiple lines, wrap it in parentheses
{
	[1, 2, 3].map((num) => (
		new Array(num)
	));
}



//! Classes & Constructors
//? 1. Always use `extends` for inheritance. There's other ways but they're bad.
{
	class PeekableQueue extends Queue {
		peek() {
	  		return this.queue[0];
		}
  	}
}

//? 2. Methods can return `this` to allow method chaining
{
	class MyClass {
		func1() {
		  this.attribute = true;
		  return this;
		}
	  
		func2(arg) {
		  this.arg = arg;
		  return this;
		}
	}
	  
	const instance = new MyClass();
	  
	instance.func1().func2(arg)
}

//? 3. It is okay to write a custom `toString()` method. Just make sure it works and has no side-effects
{
	class MyClass {
		toString() {
			return `This is ${this.attribute}`
		}
	}
}

//? 4. Class methods should either use `this` or be made into a static method
{
	class MyClass {
		static staticMethod() {
		  console.log('');
		}

		classMethod() {
			console.log(this.attribute)
		}
	}
}



//! Modules
//? 1. Always use modules (`import`/`export`) over a non-standard module system. 
// Why?: Can always transpile to preferred module system
{
	// bad
	const AirbnbStyleGuide = require('./AirbnbStyleGuide');
	module.exports = AirbnbStyleGuide.es6;

	// good
	// import AirbnbStyleGuide from './AirbnbStyleGuide';
	// export default AirbnbStyleGuide.es6;

	// best
	// import { es6 } from './AirbnbStyleGuide';
	// export default es6;

}

//? 2. Do not use wildcard imports
// Why?: This in turn makes sure you have a single default export
{
	// bad
	// import * as AirbnbStyleGuide from './AirbnbStyleGuide';

	// good
	// import AirbnbStyleGuide from './AirbnbStyleGuide';
}

//? 3. Do not export directly from an import
{
	// bad
	// export { es6 as default } from './AirbnbStyleGuide';

	// good
	// import { es6 } from './AirbnbStyleGuide';
	// export default es6;
}

//? 4. Use multi-line imports when importing many things. Use appropriate indents
{
	// bad
	// import { longNameA, longNameB, longNameC } from 'path';

	// good
	// import {
	// longNameA,
	// longNameB,
	// longNameC,
	// } from 'path';
}



//! Iterators & Generators - Don't Use xD
//? 1. Do NOT use iterators. Use higher-order functions instead of loops.
// To iterate over arrays: map() / every() / filter() / find() / findIndex() / reduce() / some() / ...
// To iterate over objects: Object.keys() / Object.values() / Object.entries()
{
	const numbers = [1, 2, 3, 4, 5];

	// bad
	let sum1 = 0;
	for (let num of numbers) {
		sum1 += num;
	}

	// good
	let sum2 = 0;
	numbers.forEach((num) => {
		sum2 += num;
	});

	// best (functional)
	const sum3 = numbers.reduce((total, num) => total + num, 0);
}

//? 2. Do NOT use generators for now. 
// Why?: They don't transpile well to ES5



//! Properties
//? 1.1 Use dot notation when accessing properties.
//? 1.2 Use bracket notation when accessing properties with a variable, or invalid identifiers
{
	const obj = {
		attr1: true,
		'attr-2': false
	}

	console.log(obj.attr1)
	console.log(obj['attr-2'])

	const func = (attr) => obj[attr] 
}



//! Variables
//? 1. Group all `const`s, then group all `let`s.
{
	const arg1 = true
	const arg2 = false
	let arg3 = ""
	let arg4 = " "
	let arg5 = "  "
}

//? 2. Declare & assign variables only where and when you need them.
{
	function func(flag) {
		if (!flag) return;

		const onlyNeededNow = true
		// ...
	}
}

//? 3. Do NOT chain variable assignments.
// Why?: Latter variables become global
{
	// bad
	function funcBad() {
		// JavaScript interprets this as let a = ( b = ( c = 1 ) );
		// The let keyword only applies to variable a; variables b and c become global variables.
		let a = b = c = 1;
	}

	// good
	function funcGood() {
		let a = 1;
		let b = a;
		let c = a;
	}
}

//? 4. Avoid line breaks before or after `=` in an assignment. If too long, surround value in parens
{
	// bad
	const foo =
		superLongLongLongLongLongLongLongLongFunctionName();

	// good
	const bar = (
		superLongLongLongLongLongLongLongLongFunctionName()
	);
}



//! Comparison Operators & Equality
//? 1. Coercion of guards always follow these simples rules
{
	undefined // -> false
	null // -> false
	0 // -> false
	NaN // -> false
	'' // -> false
	
	// OTHERS -> true
	{} // objects -> true
	[] // still an object -> true
}	


//? 2. Use shortcuts for booleans, but explicit comparisons for strings and numbers
{
	const bool = true
	const string = " "
	const num = 1
	const arr = [1]
	
	if (bool) {}
	if (string !== '') {}
	if (num > 0) {}
	if (arr.length > 0) {}
}

//? 3. Use braces to create blocks in `case` and `default` clauses that contain lexical declarations (let, const, function, class)
// Why?: Lexical declarations are visible in the ENTIRE switch block. This causes problems when multiple `case` clauses define the same thing.
{
	switch (foo) {
		case 1: {
		  let x = 1;
		  break;
		}
		case 2: {
		  const y = 2;
		  break;
		}
		case 3: {
		  function f() {
			// ...
		  }
		  break;
		}
		case 4:
		  bar();
		  break;
		default: {
		  class C {}
		}
	}
}

//? 4. Do NOT nest ternaries. Also, split into single-line expressions.
{
	const maybeNull = value1 > value2 ? 'baz' : null;
	const foo = maybe1 > maybe2 ? 'foo' : maybeNull;
}

//? 5. Avoid unecessary ternary statements
{
	// bad
	const foo1 = a ? a : b;
	const bar1 = c ? true : false;
	const baz1 = c ? false : true;
	const quux1 = a != null ? a : b;

	// good
	const foo2 = a || b;
	const bar2 = !!c;
	const baz2 = !c;
	const quux2 = a ?? b;
}

//? 6. When mixing operators, enclose them in parentheses.
// The only exception is the standard arithmetic operators: +, -, and ** since their precedence is broadly understood. 
// We recommend enclosing / and * in parentheses because their precedence can be ambiguous when they are mixed.
{
	const foo1 = a && b < 0 || c > 0 || d + 1 === 0; // bad 
	const foo2 = (a && b < 0) || c > 0 || (d + 1 === 0); // good

	const bar1 = a ** b - 5 % d; // bad
	const bar2 = a ** b - (5 % d); // good

	if (a || b && c) {} // bad -> this actually evaluates right to left
	if (a || (b && c)) {} // good

	const baz1 = a + b / c * d; // bad
	const baz2 = a + (b / c) * d; // good
}



//! Blocks
//? 1. Use braces with all multiline blocks
{
	function func() {
		// bad
		if (test)
			return false;

		// good
		if (test) return false;

		// good
		if (test) {
			return false;
		}

		// bad
		function foo() { return false; }

		// good
		function bar() {
			return false;
		}
	}
}



//! Control Statements
//? 1. If control statements get too long, each GROUPED condition should be put on a new line. The logical operator begins the line.
{
	if (
		(foo === 123 || bar === 'abc')
		&& doesItLookGoodWhenItBecomesThatLong()
		&& isThisReallyHappening()
	  ) {
		// ...
	  }
}

//? 2. Do NOT use selection operators in place of control statements
{
	// bad
	!isRunning && startRunning();

	// good
	if (!isRunning) {
	startRunning();
	}
}



//! Comments
//? 1. Use `/** */` for multi-line comments
{
	/**
 	* func() returns a string
 	* based on the passed-in token
 	*/
	 function func(token) {
		return token;
  	}
}

//? 2. Use `//` for single line comments. Place the comment above the subject. Put an empty line before UNLESS it's the first line of the block.
{
	// bad
	const bool1 = true;  // description

	// good
	// description
	const bool2 = true;


	// good
	function func() {
		// first comment - no newline above
		const something = ""

		// another comment - newline above. `return` is separated because it's NOT the subject
		const subjectOfComment = ""

		return true
	}
}

//? 3.1 Prefix your comments with FIXME and TODO to have actionable comments
//? 3.2 Use `// FIXME:` to annotate problems
//? 3.3 Use `// TODO:` to annotate needed actions/solutions
{
	// FIXME: Shouldn't be a var here
	var me = true

	// TODO: Should be turned into a const
	var you = false
}



//! Whitespace
//? 1. Leave a blank line after blocks and before the next statement
{
	function func() {
		if (foo) {
			return bar;
		}
		
		return baz;
	}

	const arr = [
		function foo() {
			// ...
		},
	  
		function bar() {
			// ...
		},
	];
}



//! Commas
//? Always use trailing commas for better git diffs
/** 
	// bad - git diff without trailing comma
	const hero = {
		firstName: 'Florence',
	-    lastName: 'Nightingale'
	+    lastName: 'Nightingale',
	+    inventorOf: ['coxcomb chart', 'modern nursing']
	};

	// good - git diff with trailing comma
	const hero = {
		firstName: 'Florence',
		lastName: 'Nightingale',
	+    inventorOf: ['coxcomb chart', 'modern nursing'],
	};
*/



//! Semicolons
//? Use them.



//! Type Casting & Coercion
//? 1. Always perform type coercion at the beginning of a statement

//? 2. Strings. Use `String()` for type casting.
{
	const obj = { attr: 15 };
	let myStr;

	myStr = new String(obj.attr) // bad -- typeof myStr is OBJECT not string
	myStr = obj.attr + "" // bad -- invokes obj.attr.valueOf()
	myStr = obj.attr.toString() // bad -- toString() can be modified

	myStr = String(obj.attr) // good!
}

//? 3. Numbers. Use `Number()` for type casting and `parseInt` with a radix for parsing strings.
{
	const input = '5';
	let val;

	val = new Number(input) // bad
	val = +input // bad
	val = inputValue >> 0 // bad -- if need to be used to coerce, specify why
	val = parseInt(input) // bad
	
	val = Number(input) // good
	val = parseInt(input, 10) // good -- always specify radix
}

//? 4. Booleans. Use `!!`
{
	const num = 0;
	let isNum;

	isNum = new Boolean(num) // bad
	isNum = Boolean(num) // good
	isNum = !!num // best
}



//! Naming Conventions
//? 1. Avoid use single-letter names. Be descriptive with your naming.

//? 2. Use camelCase when naming objects, functions, instances.

//? 3. Use PascalCase only when naming constructors or classes

//? 4. Do NOT use trailing or leading underscores.
{
	// bad
	this.__firstName__ = 'Panda';
	this.firstName_ = 'Panda';
	this._firstName = 'Panda';

	// good
	this.firstName = 'Panda';

	// good, in environments where WeakMaps are available
	// see https://kangax.github.io/compat-table/es6/#test-WeakMap
	const firstNames = new WeakMap();
	firstNames.set(this, 'Panda');
}

//? 5. Do NOT save references to `this`. Use arrow functions of `Function#bind`
{
	// bad
	function foo() {
		const that = this;
		return function () {
			console.log(that);
		};
	}
  
  	// good
	function bar() {
		return () => {
			console.log(this);
		};
	}
}

//? 6. A base filename should EXACTLY match the name of its default export. 
{
	// import CheckBox from './CheckBox'; // PascalCase export/import/filename
	// import fortyTwo from './fortyTwo'; // camelCase export/import/filename
	// import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
	// ^ supports both insideDirectory.js and insideDirectory/index.js
}

//? 7. Use camelCase when export-default a function. Filename should again be identical to function's name.
{
	function makeStyleGuide() {
		// ...
	}
	  
	// export default makeStyleGuide;
}

//? 8. Use PascalCase when export-default a constructor, class, singleton, function library, bare object
{
	const AirbnbStyleGuide = {
		es6: {},
	};
	  
	// export default AirbnbStyleGuide;
}

//? 9. Acronyms and initialisms should always ALL uppercased or ALL lowercased. It's even better NOT to use them :D
{
	const SmsContainers = [] // bad
	const SMSContainers = [] // good
	const smsContainers = [] // also good
	const textMessageContainers = [] // best
}

//? 10. May uppercase a constant only if it is (1) exported, (2) is a const, (3) can be trusted to never change
{
	// export const API_KEY = 'SOMEKEY';

	// For objects, only uppercase at the top-level export, not its nested properties.
	// export const MAPPING = {
	// 	key: 'value'
	// }
}



//! Accessors

//? 1. Accessor functions for properties are NOT required.

//? 2. Do NOT use JavaScript getters/setters.
// Why?: They cause unexpected side effects and are harder to test, maintain, and reason about.	
{
	class MyClass {
		// bad 
		get attr() {}
		set attr(value) {}

		// good
		getAttr() {}
		setAttr(value) {}
	}
}

//? 3. If the property/method is a boolean, use `isVal()` or `hasVal()`
{
	if (!obj.hasAttr()) {}
	if (!obj.isAttr()) {}
}

//? 4. It's okay to create `get()` and `set()` functions, but be consistent
{
	class MyClass {
		constructor() {
			this.set('attr', attrVal)
		}

		set(key, val) {
			this[key] = val
		}

		get(key) {
			return this[key]
		}
	}
}



//! Events
//? 1. When attaching data payloads to events, pass an object literal instead of a raw value.
// Why?: Allows a subsequent contributor to add more data to the payload without finding and updating every handler
{
	// bad 
	window.addEventListener('click', (e, thing) => {
		console.log(thing)
	})
	
	// good
	window.addEventListener('click', (e, data) => {
		console.log(data.thingToUseOnEvent); // data = { thingToUseOnEvent: thing }
	})
}