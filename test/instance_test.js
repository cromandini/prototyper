/* global describe, it, beforeEach */
/* jshint onevar:false */

'use strict';

var Person = require('../test/fixtures/Person'),
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

    describe('#extend(name, iVars, cVars, descriptors)', function () {
        it('should fail', function () {
            var mechi = this.mechi;
            expect(extend).to.throw(TypeError);
            expect(extend).to.throw(/Object \[instance .*\] cannot be extended/);

            function extend() {
                mechi.extend();
            }
        });
        it('should not be owned by the instance', function () {
            expect(this.mechi.hasOwnProperty('extend')).to.be.false;
        });
    });

    describe('#create()', function () {
        it('should fail', function () {
            var mechi = this.mechi;
            expect(create).to.throw(TypeError);
            expect(create).to.throw(/Object \[instance .*\] cannot create instances/);

            function create() {
                mechi.create();
            }
        });
        it('should not be owned by the instance', function () {
            expect(this.mechi.hasOwnProperty('create')).to.be.false;
        });
    });

    describe('#defineIVar(property, descriptor)', function () {
        it('should fail', function () {
            var mechi = this.mechi;
            expect(defineIVar).to.throw(TypeError);
            expect(defineIVar).to.throw(/Object \[instance .*\] does not make use of iVars/);

            function defineIVar() {
                mechi.defineIVar();
            }
        });
        it('should not be owned by the instance', function () {
            expect(this.mechi.hasOwnProperty('defineIVar')).to.be.false;
        });
    });

    describe('#defineIVars(descriptors)', function () {
        it('should fail', function () {
            var mechi = this.mechi;
            expect(defineIVars).to.throw(TypeError);
            expect(defineIVars).to.throw(/Object \[instance .*\] does not make use of iVars/);

            function defineIVars() {
                mechi.defineIVars();
            }
        });
        it('should not be owned by the instance', function () {
            expect(this.mechi.hasOwnProperty('defineIVars')).to.be.false;
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
            this.mechi.defineProperty('foo', descriptor);
            expect(Object.getOwnPropertyDescriptor(this.mechi, 'foo')).to.eql(descriptor);
        });
        it('should be inherited', function () {
            expect(this.mechi.hasOwnProperty('defineProperty')).to.be.false;
        });
    });

    describe('#defineProperties(descriptors)', function () {
        it('should define propertys in the object', function () {
            var foo = { value: 'bar', configurable: true },
                bar = { value: 'baz' };

            this.mechi.defineProperties({ foo: foo, bar: bar });
            expect(Object.getOwnPropertyDescriptor(this.mechi, 'foo')).to.eql({
                value: foo.value,
                writable: false,
                enumerable: false,
                configurable: true
            });
            expect(Object.getOwnPropertyDescriptor(this.mechi, 'bar')).to.eql({
                value: bar.value,
                writable: false,
                enumerable: false,
                configurable: false
            });
        });
        it('should be inherited', function () {
            expect(this.mechi.hasOwnProperty('defineProperties')).to.be.false;
        });
    });

    describe('#mixin(source, options)', function () {
        it('should copy the properties of source to the instance', function () {
            var musician = {
                play: function play() {
                    return this.name + ' is playing...';
                },
                compose: function () {
                    return this.name + ' is composing...';
                }
            };
            this.mechi.mixin(musician);
            expect(this.mechi.play).to.eql(musician.play);
            expect(this.mechi.compose).to.eql(musician.compose);
        });
        it('should be inherited', function () {
            expect(this.mechi.hasOwnProperty('mixin')).to.be.false;
        });
    });
});
