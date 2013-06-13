'use strict';

var utils = require('./utils');

var Prototyper = module.exports = {
    /**
     * The name of this object.
     * @usage Prototyper YES / Class YES / instance YES
     * @type {String}
     */
    objectName: 'Prototyper',

    /**
     * Whether this object is a class.
     * @usage Prototyper YES / Class YES / instance YES
     * @type {Boolean}
     */
    isClass: true,

    /**
     * Whether this object is an instance.
     * @usage Prototyper YES / Class YES / instance YES
     * @getter
     * @return {String}
     */
    get isInstance() {
        return !this.isClass;
    },

    /**
     * The type of this object.
     * @usage Prototyper YES / Class YES / instance YES
     * @getter
     * @return {String}
     */
    get objectType() {
        return this.isClass ? 'class' : 'instance';
    },

    /**
     * The prototype of this object.
     * @usage Prototyper YES / class YES / instance YES
     * @type {Object}
     */
    super: Object.prototype,

    /**
     * Returns a string representing the value of this object.
     * The string is based on object type and name.
     * Examples: [class Prototyper] [class Person] [instance person-1]
     * @usage Prototyper YES / class YES / instance YES
     * @return {String}
     */
    toString: function toString() {
        return '[' + this.objectType + ' ' + this.objectName + ']';
    },

    /**
     * Creates a class object that inherits from this class.
     * @usage Prototyper YES / class YES / instance NO
     * @param {String} name
     * @param {Object} [iVars] The instance members
     * @param {Object} [cVars] The class members
     * @param {Object} [descriptors] Property descriptor set
     * @return {Object}
     * @throws {TypeError} if invoked in instance objects
     * @throws {TypeError} if name is not a string
     */
    extend: function extend(name, iVars, cVars, descriptors) {
        var instanceVars = {},
            instanceCount = 0,
            theClass,
            isObject;

        if (this.isInstance) throw new TypeError('Object ' + this.toString() + ' cannot be extended');
        if (typeof name !== 'string') throw new TypeError('name must be a string: ' + name);

        theClass = Object.create(this, {
            objectName: { value: name },
            isClass: { value: true },
            super: { value: this },

            /**
             * Gets the instance properties.
             * @return {Object}
             */
            iVars: {
                get: function () {
                    if (this === theClass) return instanceVars;
                },
                enumerable: true },

            /**
             * Gets the count of instances created by the class.
             * @return {Number}
             */
            instanceCount: {
                get: function () {
                    if (this === theClass) return instanceCount;
                },
                enumerable: true
            },

            /**
             * Creates an instance object that inherits from this class.
             * @throws {TypeError} if invoked in Prototyper object
             * @return {Object}
             * @throws {TypeError} if invoked in instance objects
             */
            create: {
                value: function create() {
                    var instance;

                    if (this.isInstance) {
                        throw new TypeError('Object ' + this.toString() + ' cannot create instances');
                    }
                    instance = createInstance(theClass, ++instanceCount);
                    if (instance.initialize) instance.initialize.apply(instance, arguments);

                    return instance;
                },
                enumerable: true
            }
        });

        isObject = utils.isObject;
        if (isObject(iVars)) utils.mixProperties(theClass.iVars, iVars, { override: true });
        if (isObject(cVars)) utils.mixProperties(theClass, cVars, { all: true, override: true, define: true });
        if (isObject(descriptors)) {
            if (isObject(descriptors.iVars)) Object.defineProperties(theClass.iVars, descriptors.iVars);
            if (isObject(descriptors.cVars)) Object.defineProperties(theClass, descriptors.cVars);
        }

        return theClass;
    },

    /**
     * Defines an iVar.
     * Delegates to Object#defineProperty()
     * @usage Prototyper NO / class YES / instance NO
     * @param {String} property
     * @param {Object} descriptor Property descriptor
     * @return {Object}
     * @throws {TypeError} if invoked in Prototyper or instance object
     */
    defineIVar: function defineIVar(property, descriptor) {
        if (this === Prototyper || this.isInstance) {
            throw new TypeError('Object ' + this.toString() + ' does not make use of iVars');
        }
        Object.defineProperty(this.iVars, property, descriptor);
        return this;
    },

    /**
     * Defines iVars,
     * Delegates to Object#defineProperty()
     * @usage Prototyper NO / class YES / instance NO
     * @param {Object} descriptors Property descriptor set
     * @return {Object}
     * @throws {TypeError} if invoked in Prototyper or instance objects
     */
    defineIVars: function defineIVars(descriptors) {
        if (this === Prototyper || this.isInstance) {
            throw new TypeError('Object ' + this.toString() + ' does not make use of iVars');
        }
        Object.defineProperties(this.iVars, descriptors);
        return this;
    },

    /**
     * Defines a property in the object.
     * Delegates to Object#defineProperty()
     * @usage Prototyper NO / class YES / instance YES
     * @param {String} property
     * @param {Object} descriptor Property descriptor
     * @return {Object}
     */
    defineProperty: function defineProperty(property, descriptor) {
        return Object.defineProperty(this, property, descriptor);
    },

    /**
     * Defines properties in the object.
     * Delegates to Object#defineProperties()
     * @usage Prototyper NO / class YES / instance YES
     * @param {Object} descriptors Property descriptor set
     * @return {Object}
     */
    defineProperties: function defineProperties(descriptors) {
        return Object.defineProperties(this, descriptors);
    },

    /**
     * Copies the properties of source to this object, with given options.
     * Delegates to utils#mixProperties()
     * @usage Prototyper NO / class YES / instance YES
     * @param {Object} source
     * @param {Object} [options]
     * @param {Boolean} [options.all] true to copy all the properties, default is copying only the enumerables
     * @param {Boolean} [options.override] true to override existing properties. default is non-destructive
     * @param {Boolean} [options.define] true to define the properties instead of assign. Default is assigning
     * @return {Object}
     * @throws {TypeError} if invoked in Prototyper object
     * @throws {TypeError} if source is not an object
     */
    mixin: function mixin(source, options) {
        if (this === Prototyper) throw new TypeError('Object ' + Prototyper.toString() + ' cannot be mixed');
        if (!utils.isObject(source)) throw new TypeError('source must be an object: ' + source);
        return utils.mixProperties(this, source, options);
    }
};

Prototyper.defineProperty('super', { enumerable: false });

Object.freeze(Prototyper);

/**
 * Creates an instance object that inherits from the given class object.
 * @param {Object} theClass
 * @param {Number} serialNumber Used for naming
 * @return {Object}
 */
function createInstance(theClass, serialNumber) {
    var instance = Object.create(theClass, {
        objectName: { value: theClass.objectName.toLowerCase().replace(' ', '') + '-' + serialNumber },
        isClass: { value: false },
        super: { value: theClass }
    });

    while (theClass !== Prototyper) {
        utils.mixProperties(instance, theClass.iVars, { define: true });
        theClass = theClass.super;
    }

    return instance;
}
