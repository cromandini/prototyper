'use strict';

var Developer = require('../examples/Developer'),
    utils = require('../Prototyper').utils;

module.exports = Developer.extend('Javascript Developer',
    {
        node: false,
        es5: false,
        html5: false
    },
    {
        initialize: function initialize(name, age, languages, expertise) {
            this.super.initialize(name, age, languages);
            if (utils.isObject(expertise)) {
                if (expertise.node) this.node = expertise.node;
                if (expertise.es5) this.es5 = expertise.es5;
                if (expertise.html5) this.html5 = expertise.html5;
            }
        }
    },
    {
        iVars: {
            mainLanguage: {
                value: { name: 'Javascript', hours: 10 },
                writable: false
            }
        }
    }
);
