/**
 * IdeaController
 *
 * @description :: Server-side logic for managing Ideas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res){
        var elem = {
            name : req.param('name'),
            description : req.param('description'),
            user : req.param('user')
        };

        Idea.create(elem).exec(function (err, user) {
            if (err) {return res.send(500);}else{ return res.ok();}
        });
    }
};

