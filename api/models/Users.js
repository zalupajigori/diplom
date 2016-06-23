/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models

/**  */

var passwordHash = require('password-hash');


var Users = {
    attributes: {
        login: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true,
            minLength: 6
        },
        email:{
            type: "string",
            required: "true",
            unique:true
        },
        telefon:{
            type:"string"
        },
        name: {
            type: "string"
        },
        surname : {
            type: "string"
        },
        toJSON: function () {
            var element = this.toObject();
            delete element.password;
            return element;
        }
    },

    beforeCreate: function (value, next){
        var mainPass = passwordHash.generate(value.password);
        value.encryptPassword = mainPass;
        next();
    }
}

module.exports = Users;



