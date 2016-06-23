/**
* TableZ.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var TableZ = {

  attributes: {
    number:{
        type:'Integer'
    },
      kolvo:{
          type:'Integer'
      },
      name:{
          type:'string'
      },
      surname:{
          type:'string'
      },
  	  date: {
  		    type: 'date'
  	  }
}
};
module.exports = TableZ;
