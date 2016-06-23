/**
* Sklad.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var Sklad = {
    attributes: {
      ingri: {
        model: 'Ingridients'
      },
      price: {
        type: 'string'
      },
      amount: {
        type: 'integer'
      },
      naklav: {
        model: "Naklavs"
      }
    }
}

module.exports = Sklad;
