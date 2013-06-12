/* global describe, it, beforeEach, afterEach */
/* jshint onevar:false */

'use strict';

var Prototyper = require('../lib/Prototyper'),
    utils = require('../lib/utils'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonChai = require("sinon-chai"),
    expect = chai.expect;

chai.use(sinonChai);

var Person = require('../examples/Person'),
    Developer = require('../examples/Developer'),
    JavascriptDeveloper = require('../examples/JavascriptDeveloper');

describe('Class', function () {

    describe('#objectName', function () {
        it('should be the name of the object', function () {
            expect(Person.objectName).to.equal('Person');
            expect(Developer.objectName).to.equal('Developer');
            expect(JavascriptDeveloper.objectName).to.equal('Javascript Developer');
        });
        it('should be non-enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Person, 'objectName').enumerable).to.be.false;
        });
        it('should be owned by the object', function () {
            expect(Person.hasOwnProperty('objectName')).to.be.true;
            expect(Developer.hasOwnProperty('objectName')).to.be.true;
        });
    });

    describe('#isClass', function () {
        it('should be true', function () {
            expect(Person.isClass).to.be.true;
            expect(Developer.isClass).to.be.true;
        });
        it('should be non-enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Person, 'isClass').enumerable).to.be.false;
            expect(Object.getOwnPropertyDescriptor(Developer, 'isClass').enumerable).to.be.false;
        });
        it('should be owned by the object', function () {
            expect(Person.hasOwnProperty('isClass')).to.be.true;
            expect(Developer.hasOwnProperty('isClass')).to.be.true;
        });
    });

    describe('#isInstance', function () {
        it('should be false', function () {
            expect(Person.isInstance).to.be.false;
            expect(Developer.isInstance).to.be.false;
        });
        it('should be inherited', function () {
            expect(Person.hasOwnProperty('isInstance')).to.be.false;
            expect(Developer.hasOwnProperty('isInstance')).to.be.false;
        });
    });

    describe('#objectType', function () {
        var expected = 'class';
        it('should be "' + expected + '"', function () {
            expect(Person.objectType).to.equal(expected);
            expect(Developer.objectType).to.equal(expected);
        });
        it('should be inherited', function () {
            expect(Person.hasOwnProperty('objectType')).to.be.false;
            expect(Developer.hasOwnProperty('objectType')).to.be.false;
        });
    });

    describe('#super', function () {
        it('should be the prototype of the class', function () {
            expect(Person.super).to.equal(Prototyper);
            expect(Person.super).to.equal(Prototyper);
        });
        it('should be non-enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Person, 'super').enumerable).to.be.false;
            expect(Object.getOwnPropertyDescriptor(Developer, 'super').enumerable).to.be.false;
        });
        it('should be owned by the object', function () {
            expect(Person.hasOwnProperty('super')).to.be.true;
            expect(Developer.hasOwnProperty('super')).to.be.true;
        });
    });

    describe('#iVars', function () {
        it('should be an object', function () {
            expect(Prototyper.extend('Foo').iVars).to.be.an('object');
        });
        it('should be empty by default', function () {
            expect(Prototyper.extend('Foo').iVars).to.eql({});
        });
        it('should contain the instance properties', function () {
            expect(Person.iVars.happiness).to.equal(10);
            expect(Person.iVars.happinessThreshold).to.equal(100);
            expect(Developer.iVars.languages).to.eql({});
            expect(Developer.iVars.mainLanguage).to.eql({ name: 'C', hours: 10 });
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Person, 'iVars').enumerable).to.be.true;
            expect(Object.getOwnPropertyDescriptor(Developer, 'iVars').enumerable).to.be.true;
        });
        it('should be owned by the object', function () {
            expect(Person.hasOwnProperty('iVars')).to.be.true;
            expect(Developer.hasOwnProperty('iVars')).to.be.true;
        });
    });

    describe('#iSerial', function () {
        it('should be an accessor with only a getter', function () {
            var descriptor = Object.getOwnPropertyDescriptor(Developer, 'iSerial');
            expect(descriptor.get).to.be.a('function');
            expect(descriptor.set).to.be.undefined;
            expect(setISerial).to.throw(TypeError);
            expect(setISerial).to.throw(/Cannot set property iSerial .* which has only a getter/);

            function setISerial() {
                Developer.iSerial = 11;
            }
        });
        it('should be enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(Developer, 'iSerial').enumerable).to.be.true;
        });
        it('should get incremental serial numbers starting from 1', function () {
            expect(Developer.iSerial).to.equal(1);
            expect(Developer.iSerial).to.equal(2);
            expect(Developer.iSerial).to.equal(3);
            expect(Developer.iSerial).to.equal(4);
        });
    });

    describe('#toString()', function () {
        it('should return a string representing the value of the object', function () {
            expect(Person.toString()).to.equal('[class Person]');
            expect(Developer.toString()).to.equal('[class Developer]');
        });
        it('should be inherited', function () {
            expect(Person.hasOwnProperty('toString')).to.be.false;
        });
    });

    describe('#extend(name, iVars, cVars, descriptors)', function () {
        it('should create a Class object that inherits from the Class', function () {
            expect(Person.isClass).to.be.true;
            expect(Developer.isClass).to.be.true;

            expect(Person.super).to.eql(Prototyper);
            expect(Developer.super).to.eql(Person);

            expect(Prototyper.isPrototypeOf(Person)).to.be.true;
            expect(Prototyper.isPrototypeOf(Developer)).to.be.true;
            expect(Person.isPrototypeOf(Developer)).to.be.true;
        });
        it('should be inherited', function () {
            expect(Person.hasOwnProperty('extend')).to.be.false;
            expect(Developer.hasOwnProperty('extend')).to.be.false;
        });
    });

    describe('#create()', function () {
        it('should create an instance object that inherits from the object.', function () {
            var mechi = Person.create('Mechi');
            expect(mechi.isInstance).to.be.true;
            expect(mechi.super).to.equal(Person);
            expect(Person.isPrototypeOf(mechi)).to.be.true;

            var clau = Developer.create('Claudio');
            expect(clau.super).to.equal(Developer);
            expect(Developer.isPrototypeOf(clau)).to.be.true;
            expect(Person.isPrototypeOf(clau)).to.be.true;
            expect(Prototyper.isPrototypeOf(clau)).to.be.true;
        });
        it('should copy #iVars of Class and of all the classes in the prototype chain', function () {
            var foo = JavascriptDeveloper.create('Foo');

            expect(foo).to.contain.keys(Object.keys(Person.iVars));
            expect(foo).to.contain.keys(Object.keys(Developer.iVars));
            expect(foo).to.contain.keys(Object.keys(JavascriptDeveloper.iVars));
        });
        it('should be inherited', function () {
            expect(Person.hasOwnProperty('create')).to.be.false;
            expect(Developer.hasOwnProperty('create')).to.be.false;
        });
        describe('instance#objectName', function () {
            it('should be a string formed by Class#objectName in lowercase and Class#iSerial', function () {
                expect(Developer.create('Foo').objectName).to.equal('developer-6');
                expect(Developer.create('Foo').objectName).to.equal('developer-7');
                expect(JavascriptDeveloper.create('Foo').objectName).to.equal('javascriptdeveloper-2');
                expect(JavascriptDeveloper.create('Foo').objectName).to.equal('javascriptdeveloper-3');
                expect(JavascriptDeveloper.create('Foo').objectName).to.equal('javascriptdeveloper-4');
            });
        });
        describe('instance#initialize()', function () {
            beforeEach(function () {
                this.initializeSpy = sinon.spy(Person, 'initialize');
            });
            afterEach(function () {
                this.initializeSpy.restore();
            });
            it('should be called, if defined, in the creation process', function () {
                expect(this.initializeSpy).to.not.have.been.called;
                Person.create('Mechi');
                expect(this.initializeSpy).to.have.been.calledOnce;
            });
            it('should be called with #create() arguments', function () {
                Person.create('Mechi', 2, Prototyper);
                expect(this.initializeSpy).to.have.been.calledWith('Mechi', 2, Prototyper);
            });
        });
    });

    describe('#defineIVar(property, descriptor)', function () {
        it('should define one iVar in Class', function () {
            var descriptor = {
                value: 1,
                enumerable: false,
                writable: false,
                configurable: true
            };
            Person.defineIVar('foo', descriptor);
            expect(Object.getOwnPropertyDescriptor(Person.iVars, 'foo')).to.eql(descriptor);
        });
        it('should be inherited', function () {
            expect(Person.hasOwnProperty('defineIVar')).to.be.false;
            expect(Developer.hasOwnProperty('defineIVar')).to.be.false;
        });
    });

    describe('#defineIVars(descriptors)', function () {
        it('should define iVars in Class', function () {
            var foo = { value: 'bar' },
                bar = { value: 'baz' };

            Person.defineIVars({ foo: foo, bar: bar });
            expect(Object.getOwnPropertyDescriptor(Person.iVars, 'foo')).to.eql({
                value: foo.value,
                writable: false,
                enumerable: false,
                configurable: true
            });
            expect(Object.getOwnPropertyDescriptor(Person.iVars, 'bar')).to.eql({
                value: bar.value,
                writable: false,
                enumerable: false,
                configurable: false
            });
        });
        it('should be inherited', function () {
            expect(Person.hasOwnProperty('defineIVars')).to.be.false;
            expect(Developer.hasOwnProperty('defineIVars')).to.be.false;
        });
    });

    describe('#defineProperty(property, descriptor)', function () {
        it('should define a property in the object', function () {
            var descriptor = {
                value: 1,
                enumerable: false,
                writable: false,
                configurable: true
            };
            Person.defineProperty('foo', descriptor);
            expect(Object.getOwnPropertyDescriptor(Person, 'foo')).to.eql(descriptor);
        });
        it('should be inherited', function () {
            expect(Person.hasOwnProperty('defineProperty')).to.be.false;
            expect(Developer.hasOwnProperty('defineProperty')).to.be.false;
        });
    });

    describe('#defineProperties(descriptors)', function () {
        it('should define propertys in the object', function () {
            var foo = { value: 'bar' },
                bar = { value: 'baz' };

            Person.defineProperties({ foo: foo, bar: bar });
            expect(Object.getOwnPropertyDescriptor(Person, 'foo')).to.eql({
                value: foo.value,
                writable: false,
                enumerable: false,
                configurable: true
            });
            expect(Object.getOwnPropertyDescriptor(Person, 'bar')).to.eql({
                value: bar.value,
                writable: false,
                enumerable: false,
                configurable: false
            });
        });
        it('should be inherited', function () {
            expect(Person.hasOwnProperty('defineProperties')).to.be.false;
            expect(Developer.hasOwnProperty('defineProperties')).to.be.false;
        });
    });

    describe('#mixin(source, options)', function () {
        it('should copy the properties of source to Class', function () {
            var musician = {
                play: function play() {
                    return this.name + ' is playing...';
                },
                compose: function () {
                    return this.name + ' is composing...';
                }
            };
            Person.mixin(musician);
            expect(Person.play).to.eql(musician.play);
            expect(Person.compose).to.eql(musician.compose);
        });
        it('should fail if source is not an object', function () {
            expect(mixin).to.throw(TypeError);
            expect(mixin).to.throw(/source must be an object/);

            function mixin() {
                Person.mixin();
            }
        });
        it('should delegate to utils#mixProperties()', function () {
            var mixPropertiesSpy = sinon.spy(utils, 'mixProperties');
            var writer = {
                write: function write() {
                    return this.name + ' is writing...';
                }
            };
            var options = { all: true, override: true, define: true };
            Person.mixin(writer, options);
            expect(mixPropertiesSpy).to.have.been.calledOnce;
            expect(mixPropertiesSpy).to.have.been.calledWith(Person, writer, options);
            mixPropertiesSpy.restore();
        });
        it('should be inherited', function () {
            expect(Person.hasOwnProperty('mixin')).to.be.false;
            expect(Developer.hasOwnProperty('mixin')).to.be.false;
        });
    });
});
