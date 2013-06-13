'use strict';

var Developer = require('./Developer'),
    utils = require('../../lib/utils');

module.exports = Developer.extend('Javascript Developer',
    // iVars
    {
        node: false,
        es5: false,
        html5: false,
        mainLanguage: { name: 'Javascript', hours: 10 }
    },
    // cVars
    {
        initialize: function initialize(name, languages, expertise) {
            Developer.initialize.call(this, name, languages);

            if (utils.isObject(expertise)) {
                this.node = !!expertise.node;
                this.es5 = !!expertise.es5;
                this.html5 = !!expertise.html5;
            }
        }
    },
    // descriptors
    {
        iVars: {
            mainLanguage: { writable: false }
        }
    }
);
