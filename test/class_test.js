/* global describe, it, beforeEach */
/* jshint onevar:false */

'use strict';

var Prototyper = require('../Prototyper'),
    utils = require('../lib/utils'),
    sinon = require('sinon'),
    chai = require('chai'),
    sinonChai = require("sinon-chai"),
    expect = chai.expect;

chai.use(sinonChai);

var Person = require('../examples/Person'),
    Developer = require('../examples/Developer'),
    JavascriptDeveloper = require('../examples/JavascriptDeveloper');

describe('class objects', function () {

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
        it('should be an empty object by default', function () {
            expect(Prototyper.extend('Foo').iVars).to.eql({});
        });
        it('should hold the instance properties', function () {
            expect(Person.iVars.happiness).to.equal(10);
            expect(Person.iVars.happinessThreshold).to.equal(100);
        });
        it('should fail if............', function () {
//            Person.iVars.happiness = 2;
        });
    });
});
