/**
 * ServiceController
 *
 * @description :: Server-side logic for managing Services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res){
        var elem = {
            Service_user : req.param('Service_user'),
            description : req.param('description'),
            mark : req.param('mark')
        };

        Musik.create(elem).exec(function (err, user) {
            if (err) {return res.send(500);}else{ return res.ok();}
        });
    }
};

