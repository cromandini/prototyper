'use strict';

var Prototyper = require('../lib/Prototyper');

module.exports = Prototyper.extend('Person',
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
            console.log('My name is ' + this.name);
        },
        get isHappy() {
            return this.happiness >= this.happinessThreshold;
        },
        beHappier: function beHappier() {
            this.happiness += 10;
        }
    },
    // descriptors
    {
        iVars: {
            happinessThreshold: { writable: false }
        },
        cVars: {
            beHappier: {
                writable: false,
                configurable: false
            }
        }
    }
);
