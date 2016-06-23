/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/***/
var passwordHash = require('password-hash');
module.exports = {

	create: function (req, res){
        var elem = {
            login : req.param('login'),
            password : req.param('password'),
            email: req.param('email'),
            telefon: req.param('telefon'),
            name: req.param('name'),
            surname: req.param('surname')
        };

        Users.create(elem).exec(function (err, user) {
            if (err) {return res.send(500);}else{ return res.ok();}
        });
    },

    auth: function (req, res) {
        var username = req.param('username'),
            password = req.param('password');

        if (!username || !password) {
            return res.send(500);
        };
        Users.findOneByLogin(username).exec(function (err, user) {
            if (!user || err) return res.send(500);
            if (passwordHash.verify(password, user.encryptPassword)) {
                return res.send(user);
            }else{return res.send(500);};
        });
    }




};

