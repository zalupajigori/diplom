/**
 * IngridientsController
 *
 * @description :: Server-side logic for managing Ingridients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  list: function (req, res) {

       Ingridients.count().exec(function (err, found) {
         if (err){
          console.log(err);
          return res.send(err);
         }
         var len = found;

         if (typeof(req.param('category'))!="undefined") {
           var myQuery = Ingridients.find({category:req.param('category')});
         }else{
           var myQuery = Ingridients.find({});
         }
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
    Ingridients.find({ title : {
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
