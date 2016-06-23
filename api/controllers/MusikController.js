/**
 * MusikController
 *
 * @description :: Server-side logic for managing Musiks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res){
        var elem = {
			group: req.param('group'),
           name : req.param('name'),
            like : req.param('like')
        };

        Musik.create(elem).exec(function (err, user) {
            if (err) {return res.send(500);}else{ return res.ok();}
        });
    },
    update: function (req, res){
        var id =  req.param('id');

        var elem = {
            group: req.param('group'),
            name : req.param('name'),
            like : req.param('like')
        };

        Musik.create(elem).exec(function (err, user) {
            if (err) {return res.send(500);}else{ return res.ok();}
        });
    }
};

