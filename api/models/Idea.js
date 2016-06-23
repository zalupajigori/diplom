/**
* Idea.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Idea = {

  attributes: {
    name:{
        type:'string'
    },
      description:{
          type:'string'
      },
    user:{
        type:'string'
    }
  }
};

module.exports = Idea;