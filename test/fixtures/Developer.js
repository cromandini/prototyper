'use strict';

var Person = require('./Person');

module.exports = Person.extend('Developer',
    // iVars
    {
        languages: [],
        mainLanguage: { name: 'C', hours: 10 }
    },
    // cVars
    {
        initialize: function initialize(name, languages) {
            var me = this;

            Person.initialize.call(this, name);

            this.languages.push(this.mainLanguage);
            if (Array.isArray(languages)) {
                languages.forEach(function (language) {
                    me.languages.push(language);
                });
            }
        }
    },
    // descriptors
    {
        iVars: {
            languages: { writable: false },
            mainLanguage: { writable: false }
        }
    }
);
