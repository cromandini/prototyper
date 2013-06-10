/* global describe, it, beforeEach */
/* jshint onevar:false */

'use strict';

var utils = require('../lib/utils'),
    expect = require('chai').expect;

describe('utils', function () {

    describe('#isObject(target)', function () {
        it('should return true if target is an object', function () {
            expect(utils.isObject(undefined)).to.be.false;
            expect(utils.isObject(null)).to.be.false;
            expect(utils.isObject(true)).to.be.false;
            expect(utils.isObject('foo')).to.be.false;
            expect(utils.isObject(123)).to.be.false;
            expect(utils.isObject([])).to.be.false;
            expect(utils.isObject(new Array(1, 2))).to.be.false;
            expect(utils.isObject(/foo/)).to.be.false;
            expect(utils.isObject(new RegExp('foo'))).to.be.false;
            expect(utils.isObject(new Date())).to.be.false;
            expect(utils.isObject(Date())).to.be.false;
            expect(utils.isObject(Date.now())).to.be.false;
            expect(utils.isObject(function () {
            })).to.be.false;
            expect(utils.isObject({})).to.be.true;
            expect(utils.isObject(new Object(1, 2))).to.be.true;
        });
    });

    describe('#mixProperties(target, source, options)', function () {
        beforeEach(function () {
            this.target = {
                sayHi: function () {
                    return 'hi';
                }
            };
            this.source = {
                name: 'Mechi',
                speaks: true,
                sayHi: function () {
                    return 'hi, my name is ' + this.name;
                }
            };
        });
        it('should fail if target or source are not objects', function () {
            expect(mixProperties()).to.throw(TypeError);
            expect(mixProperties()).to.throw(/target must be an object/);
            expect(mixProperties(null, {})).to.throw(/target must be an object/);
            expect(mixProperties({})).to.throw(/source must be an object/);
            expect(mixProperties({}, 1)).to.throw(/source must be an object/);

            function mixProperties(target, source) {
                return function () {
                    utils.mixProperties(target, source);
                };
            }
        });
        it('should copy properties from source to target', function () {
            utils.mixProperties(this.target, this.source);
            expect(Object.getOwnPropertyNames(this.target)).to.eql([ 'sayHi', 'name', 'speaks' ]);
        });
        it('should copy only the enumerable properties unless options.all is true', function () {
            Object.defineProperty(this.source, 'speaks', { enumerable: false });
            utils.mixProperties(this.target, this.source);
            expect(Object.getOwnPropertyNames(this.target)).to.eql([ 'sayHi', 'name' ]);

            utils.mixProperties(this.target, this.source, { all: true });
            expect(Object.getOwnPropertyNames(this.target)).to.eql([ 'sayHi', 'name', 'speaks' ]);
        });
        it('should not override properties unless options.override is true', function () {
            utils.mixProperties(this.target, this.source);
            expect(this.target.sayHi()).to.equal('hi');

            utils.mixProperties(this.target, this.source, { override: true });
            expect(this.target.sayHi()).to.equal('hi, my name is Mechi');
        });
        it('should assign the values of the properties unless options.define is true', function () {
            Object.defineProperty(this.source, 'speaks', { writable: false });

            utils.mixProperties(this.target, this.source);
            expect(Object.getOwnPropertyDescriptor(this.target, 'speaks').writable).to.be.true;

            utils.mixProperties(this.target, this.source, { override: true, define: true });
            expect(Object.getOwnPropertyDescriptor(this.target, 'speaks').writable).to.be.false;
        });
    });

    describe('#defineAllProperties(target, descriptor)', function () {
        it('should fail if target or descriptor are no objects', function () {
            expect(defineAllProperties()).to.throw(TypeError);
            expect(defineAllProperties()).to.throw(/target must be an object/);
            expect(defineAllProperties(null, {})).to.throw(/target must be an object/);
            expect(defineAllProperties({})).to.throw(/descriptor must be an object/);
            expect(defineAllProperties({}, 1)).to.throw(/descriptor must be an object/);

            function defineAllProperties(target, descriptor) {
                return function () {
                    utils.defineAllProperties(target, descriptor);
                };
            }
        });
        it('should define all the properties of target by descriptor', function () {
            var target = {
                foo: 'bar',
                bar: 'baz'
            };
            expect(Object.getOwnPropertyDescriptor(target, 'foo').writable).to.be.true;
            expect(Object.getOwnPropertyDescriptor(target, 'bar').writable).to.be.true;

            utils.defineAllProperties(target, { writable: false });
            expect(Object.getOwnPropertyDescriptor(target, 'foo').writable).to.be.false;
            expect(Object.getOwnPropertyDescriptor(target, 'bar').writable).to.be.false;

            utils.defineAllProperties(target, { writable: true });
            expect(Object.getOwnPropertyDescriptor(target, 'foo').writable).to.be.true;
            expect(Object.getOwnPropertyDescriptor(target, 'bar').writable).to.be.true;
        });
    });
});
