/**
 * SkladController
 *
 * @description :: Server-side logic for managing sklads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');
module.exports = {
  list: function(req, res) {
    Sklads.count().exec(function(err, found) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      var len = found;

      var myQuery = Sklads.find({});
      if (typeof(req.param('order') != "undefined")) {
        if (req.param('order').substring(0, 1) == "-") {
          var sort_string = req.param('order').substring(1, req.param('order').length);
          myQuery.sort(sort_string + ' DESC');
        } else {
          myQuery.sort(req.param('order') + ' ASC');
        }
      }
      myQuery.populateAll();
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
  ostat: function(req, res) {
    Sklads.find({}).groupBy('ingri').sum('amount').exec(function(err, result) {
      var tasks = [];
      result.forEach(function(item) {
        var func = function(callback) {
          Ingridients.find({
            id: item.ingri
          }).exec(function(err, itm) {
            var resu = {
              ingri: itm[0],
              amount: item.amount
            }
            callback(err, resu);
          });
        }
        tasks.push(func);
      });
      async.parallel(tasks, function(err, results) {
        var me = {
          data: results
        }
        res.send(200, me);
      });
      //Sklads.find({Where:{}, groupBy:'ingri', sum: 'amount'}).exec(function(err,result){


    });
  }

}
