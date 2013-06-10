/* global describe, it, beforeEach */
/* jshint onevar:false */

'use strict';

var Prototyper = require('../Prototyper'),
    expect = require('chai').expect,
    utils = require('../lib/utils');

describe('Prototyper', function () {

    it('should be frozen', function () {
        expect(Object.isFrozen(Prototyper)).to.be.true;
    });

    it('should inherit from Object#prototype', function () {
        expect(Object.prototype.isPrototypeOf(Prototyper)).to.be.true;
    });

    describe('#objectName', function () {
        it('should be "Prototyper"', function () {
            expect(Prototyper.objectName).to.equal('Prototyper');
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'objectName').enumerable).to.be.true;
        });
    });

    describe('#isClass', function () {
        it('should be true', function () {
            expect(Prototyper.isClass).to.be.true;
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'isClass').enumerable).to.be.true;
        });
    });

    describe('#isInstance', function () {
        it('should be false', function () {
            expect(Prototyper.isInstance).to.be.false;
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'isInstance').enumerable).to.be.true;
        });
    });

    describe('#objectType', function () {
        var expected = 'Class';
        it('should be "' + expected + '"', function () {
            expect(Prototyper.objectType).to.equal(expected);
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'objectType').enumerable).to.be.true;
        });
    });

    describe('#super', function () {
        it('should be Object.prototype', function () {
            expect(Prototyper.super).to.equal(Object.prototype);
        });
        it('should be non-enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'super').enumerable).to.be.false;
        });
    });

    describe('#toString()', function () {
        var expected = '[Class Prototyper]';
        it('should return ' + expected, function () {
            expect(Prototyper.toString()).to.equal(expected);
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'toString').enumerable).to.be.true;
        });
    });

    describe('#extend(name, iVars, cVars, descriptors)', function () {
        beforeEach(function () {
            this.name = 'Person';
            this.iVars = {
                name: 'Unnamed',
                age: 0
            };
            this.cVars = {
                sayName: function sayName() {
                    console.log('My name is ' + this.name);
                },
                sayAge: function sayAge() {
                    console.log('I\'m ' + this.age + ' year' + ( this.age !== 1 ? 's' : '' ) + ' old');
                }
            };
            this.descriptors = {
                iVars: {
                    happiness: {
                        value: 10,
                        writable: false,
                        enumerable: true,
                        configurable: false
                    },
                    happinessThreshold: {
                        value: 100,
                        writable: false,
                        enumerable: true,
                        configurable: false
                    }
                },
                cVars: {
                    isHappy: {
                        get: function () {
                            return this.happiness >= this.happinessThreshold;
                        },
                        enumerable: true,
                        configurable: false
                    }
                }
            };
            this.Person = Prototyper.extend(this.name, this.iVars, this.cVars, this.descriptors);
        });
        it('should create a Class object that inherits from Prototyper', function () {
            expect(this.Person.isClass).to.be.true;
            expect(this.Person.super).to.eql(Prototyper);
            expect(Prototyper.isPrototypeOf(this.Person)).to.be.true;
        });
        it('should name Class by name', function () {
            expect(this.Person.objectName).to.equal(this.name);
        });
        it('should fail if name is not a string', function () {
            var typeErrorMessage = /name must be a string/;
            expect(extend()).to.throw(TypeError);
            expect(extend()).to.throw(typeErrorMessage);
            expect(extend(null)).to.throw(typeErrorMessage);
            expect(extend(undefined)).to.throw(typeErrorMessage);
            expect(extend({})).to.throw(typeErrorMessage);

            function extend(name) {
                return function () {
                    Prototyper.extend(name);
                };
            }
        });
        it('should copy iVars to Class#iVars', function () {
            expect(this.Person.iVars.name).to.eql(this.iVars.name);
            expect(this.Person.iVars.age).to.eql(this.iVars.age);
        });
        it('should define cVars in Class', function () {
            expect(this.Person.sayName).to.eql(this.cVars.sayName);
            expect(this.Person.sayAge).to.eql(this.cVars.sayAge);
        });
        it('should define descriptors#iVars in Class#iVars', function () {
            var descriptor = Object.getOwnPropertyDescriptor(this.Person.iVars, 'happiness');
            expect(descriptor).to.eql(this.descriptors.iVars.happiness);

            descriptor = Object.getOwnPropertyDescriptor(this.Person.iVars, 'happinessThreshold');
            expect(descriptor).to.eql(this.descriptors.iVars.happinessThreshold);
        });
        it('should define descriptors#cVars in Class', function () {
            var descriptor = Object.getOwnPropertyDescriptor(this.Person, 'isHappy');
            expect(descriptor.get).to.be.a('function');
            expect(descriptor.get).to.equal(this.descriptors.cVars.isHappy.get);
            expect(descriptor.set).to.be.undefined;
            expect(descriptor.enumerable).to.be.true;
            expect(descriptor.configurable).to.be.false;
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'extend').enumerable).to.be.true;
        });
    });

    describe('#create()', function () {
        it('should fail', function () {
            expect(create).to.throw(/Object \[Class Prototyper\] cannot create instances/);
            expect(create).to.throw(TypeError);

            function create() {
                Prototyper.create();
            }
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'create').enumerable).to.be.true;
        });
    });

    describe('#defineIVar(property, descriptor)', function () {
        it('should fail', function () {
            expect(defineIVar).to.throw(TypeError);
            expect(defineIVar).to.throw(/Object \[Class Prototyper\] does not make use of iVars/);

            function defineIVar() {
                Prototyper.defineIVar('foo', { value: 2 });
            }
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'defineIVar').enumerable).to.be.true;
        });
    });

    describe('#defineIVars(descriptors)', function () {
        it('should fail', function () {
            expect(defineIVars).to.throw(TypeError);
            expect(defineIVars).to.throw(/Object \[Class Prototyper\] does not make use of iVars/);

            function defineIVars() {
                Prototyper.defineIVars({
                    foo: { value: 1 },
                    bar: { value: 2 }
                });
            }
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'defineIVars').enumerable).to.be.true;
        });
    });

    describe('#defineProperty(property, descriptor)', function () {
        it('should fail', function () {
            expect(defineProperty).to.throw(TypeError);
            expect(defineProperty).to.throw(/object is not extensible/);

            function defineProperty() {
                Prototyper.defineProperty('foo', {
                    value: 2
                });
            }
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'defineProperty').enumerable).to.be.true;
        });
    });

    describe('#defineProperties(descriptors)', function () {
        it('should fail', function () {
            expect(defineProperties).to.throw(TypeError);
            expect(defineProperties).to.throw(/object is not extensible/);

            function defineProperties() {
                Prototyper.defineProperties({
                    foo: { value: 1 },
                    bar: { value: 2 }
                });
            }
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'defineProperties').enumerable).to.be.true;
        });
    });

    describe('#mixin(source, options)', function () {
        it('should fail', function () {
            expect(mixin).to.throw(TypeError);
            expect(mixin).to.throw(/Object \[Class Prototyper\] cannot be mixed/);

            function mixin() {
                Prototyper.mixin();
            }
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'mixin').enumerable).to.be.true;
        });
    });

    describe('#clone()', function () {
        it('should fail', function () {
            expect(clone).to.throw(TypeError);
            expect(clone).to.throw(/Object \[Class Prototyper\] cannot be cloned, try extend/);

            function clone() {
                Prototyper.clone();
            }
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'clone').enumerable).to.be.true;
        });
    });

    describe('#utils', function () {
        it('should have static methods defined in utils module', function () {
            expect(Prototyper.utils).to.equal(utils);
            expect(Prototyper.utils.isObject).to.eql(utils.isObject);
            expect(Prototyper.utils.mixProperties).to.eql(utils.mixProperties);
            expect(Prototyper.utils.defineAllProperties).to.eql(utils.defineAllProperties);
        });
        it('should be non-enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Prototyper, 'utils').enumerable).to.be.false;
        });
    });
});
