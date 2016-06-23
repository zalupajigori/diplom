/**
 * OrdersController
 *
 * @description :: Server-side logic for managing Orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');
var request = require('request');
var liqpay = require('liqpay-sdk');
module.exports = {
  list: function(req, res) {
    Orders.count({}).exec(function(err, found) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      var len = found;
      var myQuery = Orders.find({});
      if (typeof(req.param('order') != "undefined")) {
        if (req.param('order').substring(0, 1) == "-") {
          var sort_string = req.param('order').substring(1, req.param('order').length);
          myQuery.sort(sort_string + ' DESC');
        } else {
          myQuery.sort(req.param('order') + ' ASC');
        }
      }
      if (typeof(req.param('page') != "undefined") && typeof(req.param('limit') != "undefined")) myQuery.paginate({
        page: req.param('page'),
        limit: req.param('limit')
      });
      myQuery.exec(function(err, results) {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        var send = {
          data: results,
          count: len
        }
        return res.send(send);
      });
    });
  },

  pai: function(req, res) {
    var id = req.param('id');
    Orders.findOne({
      id: id
    }).exec(function(err, item) {
      item.paid = true;
      item.save(function() {

        return res.send(200, item);
      })
    })
  },
  buy: function(req, res) {
    var st = req.param('buys');
    if (typeof(req.param('id')) != "undefined") {
      var id = req.param('id');
    }
    if (typeof(st) == "string") {
      var arr = [];
      st = JSON.parse(st);
      arr.push(st);
      st = arr;
    } else {
      var arr = [];
      st.forEach(function(s) {
        arr.push(JSON.parse(s));
      });
      st = arr;
    }
    var tasker = [];
    var tasks = [];
    st.forEach(function(buy) {
      var task = function(callback) {
        Items.findOne({
          id: buy.id
        }).exec(function(err, item) {
          if (!err) {
            callback(err, item);
          }
        });
      }
      tasker.push(task);
    });
    async.parallel(tasker, function(err, result) {
      Orders.create({
        buys: st,
        paid: true
      }).exec(function(err, ord) {
        result.forEach(function(item) {
          ord.buys.forEach(function(pp) {
            if (pp.id == item.id)
              if (typeof(item.ingri) != "undefined") {
                item.ingri.forEach(function(ing) {
                  var obj = {
                    ingri: ing.id,
                    amount: ing.kolvo * pp.kolvo * (-1)
                  }
                  var task = function(callback) {
                    Sklads.create(obj).exec(function(err, item) {

                      callback(err, item);
                    });
                  }
                  tasks.push(task);
                })
                async.parallel(tasks, function(err, result) {
                  return res.send(200, result);
                })
              } else {
                Ingridients.findOne({
                  title: item.title
                }).exec(function(err, tt) {
                  var obj = {
                    ingri: tt.id,
                    amount: pp.kolvo * (-1)
                  }
                  Sklads.create(obj).exec(function(err, item) {
                    var result = [];
                    result.push(item);
                    return res.send(200, result);
                  });
                })
              }
          });
        });
      });
    });
  },
  instapay: function(req, res) {
    var st = req.param('buys');
    if (typeof(req.param('id')) != "undefined") {
      var id = req.param('id');
    }
    if (typeof(st) == "string") {
      var arr = [];
      st = JSON.parse(st);
      arr.push(st);
      st = arr;
    } else {
      var arr = [];
      st.forEach(function(s) {
        arr.push(JSON.parse(s));
      });
      st = arr;
    }
    var tasks = [];
    suma = 0;
    st.forEach(function(s) {
      suma += s.price * s.kolvo;
    });

    async.parallel(tasks, function(err, result) {
      Orders.create({
        buys: st,
        paid: 'waiting'
      }).exec(function(err, item) {
        var public_key = "i9287951817";
        var private_key = "ZRgvUSxp5o0o5jLCJhbNgwh6g3aRJ2MDtDIldpNd";

        var liqpay1 = new liqpay(public_key, private_key);
        var html = liqpay1.cnb_form({
          version: 3,
          'action': 'pay',
          'amount': suma,
          'currency': 'UAH',
          'description': 'Оплата',
          'order_id': item.id
        });
        return res.send(200, {
          html: html
        });
      });
    });
  }
}
