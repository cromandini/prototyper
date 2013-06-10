'use strict';

var Person = require('../examples/Person'),
    utils = require('../Prototyper').utils;

module.exports = Person.extend('Developer',
    {
        languages: [],
        mainLanguage: {
            name: 'C',
            hours: 10
        }
    },
    {
        initialize: function initialize(name, languages) {
            var me = this;
            this.super.super.initialize.call(this, name); // TODO review super.super
            this.languages.push(this.mainLanguage);
            if (Array.isArray(languages)) {
                languages.forEach(function (language) {
                    me.languages.push(language);
                });
            }
        },

        code: function code(language, hours) {
            if (!utils.isObject(language)) throw new TypeError('language must be an object: ' + language);
            hours = hours || 3;
            this.languages[ language.name ].hours += hours;
            return this.name + ' coded ' + this.languages[ language.name ] + ' for ' + hours + ' hours';
        }
    },
    {
        iVars: {
            languages: { writable: false },
            mainLanguage: { writable: false }
        }
    }
);
