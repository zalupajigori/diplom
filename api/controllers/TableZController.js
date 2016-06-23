/**
 * TableZController
 *
 * @description :: Server-side logic for managing Tablezs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res){
        var elem = {
            number : req.param('number'),
            kolvo : req.param('kolvo'),
            name : req.param('name'),
            surname : req.param('surname'),
			         date : req.param('date')

        };

        TableZ.create(elem).exec(function (err, user) {
            if (err) {return res.send(500);}else{ return res.ok();}
        });
}
};
