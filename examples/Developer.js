'use strict';

var Person = require('../examples/Person'),
    utils = require('../Prototyper').utils;

module.exports = Person.extend('Developer',
    {
        languages: {},
        mainLanguage: { name: 'C', hours: 10 }
    },
    {
        initialize: function initialize(name, age, languages) {
            this.super.initialize(name, age);
            this.languages[ this.mainLanguage.name ] = this.mainLanguage;
            if (utils.isObject(languages)) {
                utils.mixProperties(this.languages, languages, { override: true });
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
