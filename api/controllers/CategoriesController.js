/**
 * CategoriesController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function (req, res) {
       Categories.count().exec(function (err, found) {
         if (err){
          console.log(err);
          return res.send(err);
         }
         var len = found;
       var myQuery = Categories.find({});
       if (typeof(req.param('order') != "undefined")) {
         if (req.param('order').substring(0,1) == "-"){
           var sort_string = req.param('order').substring(1,req.param('order').length);
           myQuery.sort(sort_string+' DESC');
         }else{
           myQuery.sort(req.param('order')+' ASC');
         }
       }
       if (typeof(req.param('page')!="undefined") && typeof(req.param('limit')!="undefined")) myQuery.paginate({page: req.param('page'), limit: req.param('limit')});
       myQuery.exec(function (err, results){
         if (err){
           console.log(err);
           return res.send(err);
         }
         var send = {
           data : results,
           count : len
         }
         return res.send(send);
      });

    });
  },
  auto : function (req, res){
    var search = req.param('search');
    Categories.find({ name : {
      'like' : search+'%'
    }}).populateAll().exec(function(err, items ){
      if (err) {sails.log(err); return res.send(err);}
      var result = {
        data: items
      }
      return res.send(result);
    });
  }

};
