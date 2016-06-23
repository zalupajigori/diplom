/**
* Items.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models

 /**  */

var Items = {
    attributes: {
        title: {
            type: 'string'
        },
        components: {
            type: 'object'
        },
        size: {
            type: 'integer'
        },
        price: {
            type: 'float'
        },
        visible: {
            type: 'boolean',
            defaultsTo: true
        }
    }
  };

module.exports = Items;
