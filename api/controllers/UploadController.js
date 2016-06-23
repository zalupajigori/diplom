var uuid = require('uuid-v4');

module.exports = {
  index: function(req, res) {
    req.file('file[0]').upload({
      dirname: '../../assets/images'
    }, function(err, items) {
      return res.send(200, items);
    })
  }
}
