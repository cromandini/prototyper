/* global describe, it, beforeEach */
/* jshint onevar:false */

'use strict';

var Person = require('../examples/Person'),
    expect = require('chai').expect;

describe('instance', function () {

    beforeEach(function () {
        this.mechi = Person.create('Mechi');
    });

    describe('#objectName', function () {
        it('should be based on super#objectName and super#instanceCount', function () {
            var count = Person.instanceCount;
            var createFoo = function () {
                return Person.create('Foo');
            };
            expect(createFoo().objectName).to.equal('person-' + (count + 1));
            expect(createFoo().objectName).to.equal('person-' + (count + 2));
            expect(createFoo().objectName).to.equal('person-' + (count + 3));
        });
        it('should be readonly', function () {
            expect(Object.getOwnPropertyDescriptor(this.mechi, 'objectName').writable).to.be.false;
        });
        it('should be non-enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(this.mechi, 'objectName').enumerable).to.be.false;
        });
        it('should be non-configurable', function () {
            expect(Object.getOwnPropertyDescriptor(this.mechi, 'objectName').configurable).to.be.false;
        });
        it('should be owned by the object', function () {
            expect(this.mechi.hasOwnProperty('objectName')).to.be.true;
        });
    });

    describe('#isClass', function () {
        it('should be false', function () {
            expect(this.mechi.isClass).to.be.false;
        });
        it('should be readonly', function () {
            expect(Object.getOwnPropertyDescriptor(this.mechi, 'isClass').writable).to.be.false;
        });
        it('should be non-enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(this.mechi, 'isClass').enumerable).to.be.false;
        });
        it('should be non-configurable', function () {
            expect(Object.getOwnPropertyDescriptor(this.mechi, 'isClass').configurable).to.be.false;
        });
        it('should be owned by the object', function () {
            expect(this.mechi.hasOwnProperty('isClass')).to.be.true;
        });
    });

    describe('#isInstance', function () {
        it('should be true', function () {
            expect(this.mechi.isInstance).to.be.true;
        });
        it('should be inherited', function () {
            expect(this.mechi.hasOwnProperty('isInstance')).to.be.false;
        });
    });

    describe('#objectType', function () {
        var expected = 'instance';
        it('should be "' + expected + '"', function () {
            expect(this.mechi.objectType).to.equal(expected);
        });
        it('should be inherited', function () {
            expect(this.mechi.hasOwnProperty('objectType')).to.be.false;
        });
    });

    describe('#super', function () {
        it('should be the prototype of the instance', function () {
            expect(this.mechi.super).to.equal(Person);
        });
        it('should be a class object', function () {
            expect(this.mechi.super.isClass).to.be.true;
        });
        it('should be readonly', function () {
            expect(Object.getOwnPropertyDescriptor(this.mechi, 'super').writable).to.be.false;
        });
        it('should be non-enumerable', function () {
            expect(Object.getOwnPropertyDescriptor(this.mechi, 'super').enumerable).to.be.false;
        });
        it('should be non-configurable', function () {
            expect(Object.getOwnPropertyDescriptor(this.mechi, 'super').configurable).to.be.false;
        });
        it('should be owned by the object', function () {
            expect(this.mechi.hasOwnProperty('super')).to.be.true;
        });
    });

    describe('#iVars', function () {
        it('should be undefined', function () {
            expect(this.mechi.iVars).to.be.undefined;
            expect(this.mechi.super.iVars).to.not.be.undefined;
        });
        it('should not be owned by the instance', function () {
            expect(this.mechi.hasOwnProperty('iVars')).to.be.false;
        });
    });

    describe('#instanceCount', function () {
        it('should be undefined', function () {
            expect(this.mechi.instanceCount).to.be.undefined;
            expect(this.mechi.super.instanceCount).to.not.be.undefined;
        });
        it('should not be owned by the instance', function () {
            expect(this.mechi.hasOwnProperty('instanceCount')).to.be.false;
        });
    });

    describe('#toString()', function () {
        it('should return a string representing the value of the object', function () {
            var count = Person.instanceCount;
            expect(this.mechi.toString()).to.equal('[instance person-' + count + ']');
        });
        it('should be inherited', function () {
            expect(this.mechi.hasOwnProperty('toString')).to.be.false;
        });
    });
});
