/**
 * TableController
 *
 * @description :: Server-side logic for managing Tables
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
    create: function (req, res){
        var elem = {
            number : req.param('number'),
            kolvo : req.param('kolvo')
        };

        Table.create(elem).exec(function (err, user) {
            if (err) {return res.send(500);}else{ return res.ok();}
        });
    }
};


