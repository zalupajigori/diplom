/**
* Musik.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Musik = {

  attributes: {
    group:{
		type:'string'
	},
	name:{
        type:'string'
    },
      like:{
          type:'integer'
      }
  }
};

module.exports = Musik;