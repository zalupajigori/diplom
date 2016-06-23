
module.exports = {
  index: function (req, res) {
    Sklads.destroy({}).exec(function(err, item){
      return res.send(200, item);
    });
  }
};
