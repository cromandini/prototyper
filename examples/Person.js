'use strict';

var Prototyper = require('../Prototyper');

module.exports = Prototyper.extend(
    // name
    'Person',
    // iVars
    {
        name: 'Unnamed',
        age: 0,
        happiness: 10,
        happinessThreshold: 100
    },
    // cVars
    {
        get isHappy() {
            return this.happiness >= this.happinessThreshold;
        },
        initialize: function initialize(name, age) {
            if (!name) throw new Error('name is required');
            if (age) this.age = age;
        },
        sayName: function sayName() {
            console.log('My name is ' + this.name);
        },
        sayAge: function sayAge() {
            console.log('I\'m ' + this.age + ' year' + ( this.age !== 1 ? 's' : '' ) + ' old');
        },
        beHappier: function beHappier() {
            this.happiness += 10;
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
            beHappier: {
                writable: false,
                configurable: false
            }
        }
    }
);
