'use strict';

var utils = require('./lib/utils');

var Prototyper = module.exports = {
    /**
     * The name of this object.
     * @usage All
     * @type {String}
     */
    objectName: 'Prototyper',

    /**
     * Whether this object is a class.
     * @type {Boolean}
     * Usage: All
     */
    isClass: true,

    /**
     * Whether this object is an instance.
     * @usage All
     * @getter
     * @return {String}
     */
    get isInstance() {
        return !this.isClass;
    },

    /**
     * The type of this object.
     * @usage All
     * @getter
     * @return {String}
     */
    get objectType() {
        return this.isClass ? 'Class' : 'instance';
    },

    /**
     * The prototype of this object.
     * @usage All
     * @type {Object}
     */
    super: Object.prototype,

    /**
     * Returns a string representing the value of this object.
     * The string is based on object type and name.
     * Examples: [Class Prototyper] [Class Person] [instance person-1]
     * @usage All
     * @return {String}
     */
    toString: function toString() {
        return '[' + this.objectType + ' ' + this.objectName + ']';
    },

    /**
     * Creates a class object that inherits from this class.
     * @usage Prototyper YES / Class YES / instance NO
     * @param {String} name
     * @param {Object} [iVars] The instance members
     * @param {Object} [cVars] The class members
     * @param {Object} [descriptors] Property descriptor set
     * @return {Object}
     * @throws {TypeError} if invoked in instance objects
     * @throws {TypeError} if name is not a string
     */
    extend: function extend(name, iVars, cVars, descriptors) {
        var object;

        if (this.isInstance) throw new TypeError('Object ' + this.toString() + ' cannot be extended, try clone');
        if (typeof name !== 'string') throw new TypeError('name must be a string: ' + name);

        object = Object.create(this, {
            /**
             * The name of the object.
             * @type {String}
             */
            objectName: { value: name, enumerable: true },

            /**
             * Whether the object is a class.
             * @type {Boolean}
             */
            isClass: { value: true, enumerable: true },

            /**
             * The prototype of the object.
             * @type {Object}
             */
            super: { value: this },

            /**
             * The instance properties.
             * @type {Object}
             */
            iVars: {
                value: {},
                enumerable: true,
                configurable: true
            }
        });
        if (utils.isObject(iVars)) utils.mixProperties(object.iVars, iVars, { override: true });
        if (utils.isObject(cVars)) utils.mixProperties(object, cVars, { all: true, override: true, define: true });

        if (utils.isObject(descriptors)) {
            if (utils.isObject(descriptors.iVars)) Object.defineProperties(object.iVars, descriptors.iVars);
            if (utils.isObject(descriptors.cVars)) Object.defineProperties(object, descriptors.cVars);
        }

        utils.defineAllProperties(object.iVars, { writable: false });
        return object;
    },

    /**
     * Creates an instance object that inherits from this object.
     * @usage Prototyper NO / Class YES / instance NO
     * @throws {TypeError} if invoked in Prototyper object
     * @return {Object}
     * @throws {TypeError} if invoked in Prototyper object or in instance objects
     */
    create: function create() {
        var object;

        if (this === Prototyper || this.isInstance) {
            throw new TypeError('Object ' + Prototyper.toString() + ' cannot create instances');
        }

        object = Object.create(this, {
            objectName: { value: 'prototyper-1' }, // serialize name
            isClass: { value: false },
            prototyper: { value: this }
        });
        if (this.instanceProperties) utils.mixProperties(object, this.instanceProperties);
        if (object.initialize) object.initialize.apply(object, arguments);

        return object;
    },

    /**
     * Defines an iVar, delegates to Object#defineProperty().
     * @usage Prototyper NO / Class YES / instance NO
     * @param {String} property
     * @param {Object} descriptor Property descriptor
     * @return {Object}
     * @throws {TypeError} if invoked in Prototyper or instance object
     */
    defineIVar: function defineIVar(property, descriptor) {
        if (this === Prototyper || this.isInstance) {
            throw new TypeError('Object ' + Prototyper.toString() + ' does not make use of iVars');
        }
        Object.defineProperty(this.iVars, property, descriptor);
        return this;
    },

    /**
     * Defines iVars, delegates to Object#defineProperty().
     * @usage Prototyper NO / Class YES / instance NO
     * @param {Object} descriptors Property descriptor set
     * @return {Object}
     * @throws {TypeError} if invoked in Prototyper or instance objects
     */
    defineIVars: function defineIVars(descriptors) {
        if (this === Prototyper || this.isInstance) {
            throw new TypeError('Object ' + Prototyper.toString() + ' does not make use of iVars');
        }
        Object.defineProperties(this.iVars, descriptors);
        return this;
    },

    /**
     * Defines a property in the object, delegates to Object#defineProperty().
     * @usage Prototyper NO / Class YES / instance YES
     * @param {String} property
     * @param {Object} descriptor Property descriptor
     * @return {Object}
     */
    defineProperty: function defineProperty(property, descriptor) {
        return Object.defineProperty(this, property, descriptor);
    },

    /**
     * Defines properties in the object, delegates to Object#defineProperties().
     * @usage Prototyper NO / Class YES / instance YES
     * @param {Object} descriptors Property descriptor set
     * @return {Object}
     */
    defineProperties: function defineProperties(descriptors) {
        return Object.defineProperties(this, descriptors);
    },

    /**
     * Copies the properties of source to this object, with given options.
     * @usage Prototyper NO / Class YES / instance YES
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
    },

    /**
     * Creates a clone of this object.
     * @usage Prototyper NO / Class NO / instance YES
     * @return {Object}
     * @throws {TypeError} if invoked in abstract objects
     */
    clone: function clone() {
        if (this.isClass) throw new TypeError('Object ' + this.toString() + ' cannot be cloned, try extend');
        return {};
    }
};

Object.freeze(Prototyper);