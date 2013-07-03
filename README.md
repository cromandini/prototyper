prototyper
==========

Base object for using prototypal inheritance in javascript. Is has a strong dependence on ES5.

[http://cromandini.github.io/prototyper/](http://cromandini.github.io/prototyper/)

## Getting Started

Install the module with: `npm install prototyper`

	'use strict';
	
	var Prototyper = require('prototyper').Prototyper;
	
	var Person = Prototyper.extend('Person',
		// iVars
		{
        	name: 'Unnamed',
        	happiness: 10,
        	happinessThreshold: 100
    	},
    	// cVars
    	{
    	    initialize: function initialize(name) {
    	        if (!name) throw new Error('name is required');
    	        this.name = name;
    	    },
    	    sayName: function sayName() {
    	        return 'My name is ' + this.name;
    	    },
    	    get isHappy() {
    	        return this.happiness >= this.happinessThreshold;
    	    }
    	},
    	// descriptors
    	{
    	    iVars: {
    	        happinessThreshold: {
    	            writable: false
    	        }
    	    },
    	    cVars: {
    	        sayName: {
    	            writable: false,
    	            configurable: false
    	        }
    	    }
    	}
	);

	var mechi = Person.create('Mechi');

	mechi.sayName() // -> 'My name is Mechi'
	mechi.name // -> 'Mechi'
	mechi.isHappy // -> false
	mechi.happiness = 200;
	mechi.isHappy // -> true
	mechi.happinessThreshold = 0; // -> TypeError: Cannot assign to read only property
	                                    'happinessThreshold' of [instance person-1]
	
	mechi.super.objectName // -> 'Person'
	mechi.super.toString() // -> '[class Person]'
	mechi.super.super.objectName // -> 'Prototyper'
	mechi.super.super.toString() // -> '[class Prototyper]'

## To-do list
- Documentation
- More examples
- Browser version

## Test
Run the command: `npm test`

## License
Copyright (c) 2013 Claudio Romandini  
Licensed under the MIT license.
