/**
 * Ingridients.js
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

var Ingridients = {
  attributes: {
    title: {
      type: 'string'
    },
    category: {
      model: 'categories'
    },
    size: {
      type: 'integer'
    },
    rating: {
      type: 'integer'
    }
  },
  beforeCreate: function(values, next) {
    var pr = Number(values.price)/(Number(values.size));
    var item = {
      title: values.title,
      price: pr.toFixed(2),
      images: values.images,
      visible: false
    }

    Items.create(item).exec(function(err, item) {
      if (err) res.send(500, err);
    });

    next();
  },
  afterDestroy: function(values, next) {
    Items.destroy({title: values[0].title}).exec(function(err, item){
      next();
    });
  }
}

module.exports = Ingridients;
