'use strict';

/**
 * Whether the given value is an object.
 * @param {*} target
 * @return {Boolean}
 */
var isObject = exports.isObject = function isObject(target) {
    return typeof target === 'object' &&
        target !== null && !Array.isArray(target) && !(target instanceof RegExp) && !(target instanceof Date);
};

/**
 * Copies properties from source to target with given options.
 * @param {Object} target
 * @param {Object} source
 * @param {Object} [options]
 * @param {Boolean} [options.all] true to copy all the properties, default is copying only the enumerables
 * @param {Boolean} [options.override] true to override existing properties. default is non-destructive
 * @param {Boolean} [options.define] true to define the properties instead of assign. Default is assigning
 * @return {Object}
 * @throws {TypeError} if target is not an object
 * @throws {TypeError} if source is not an object
 */
exports.mixProperties = function mixProperties(target, source, options) {
    if (!isObject(target)) throw new TypeError('target must be an object: ' + target);
    if (!isObject(source)) throw new TypeError('source must be an object: ' + source);

    var opts = options || {},
        keys = opts.all === true ? Object.getOwnPropertyNames : Object.keys,
        define = Object.defineProperty,
        fromDescriptor = Object.getOwnPropertyDescriptor;

    keys(source).forEach(function (key) {
        if (opts.override === true || !target.hasOwnProperty(key)) {
            if (opts.define === true) define(target, key, fromDescriptor(source, key));
            else target[ key ] = source[ key ];
        }
    });

    return target;
};

/**
 * Defines all the properties of target by descriptor.
 * @param {Object} target
 * @param {Object} descriptor Property descriptor
 * @throws {TypeError} if target is not an object
 * @throws {TypeError} if descriptor is not an object
 */
exports.defineAllProperties = function defineAllProperties(target, descriptor) {
    if (!isObject(target)) throw new TypeError('target must be an object: ' + target);
    if (!isObject(descriptor)) throw new TypeError('descriptor must be an object: ' + descriptor);

    Object.getOwnPropertyNames(target).forEach(function (key) {
        Object.defineProperty(target, key, descriptor);
    });

    return target;
};
