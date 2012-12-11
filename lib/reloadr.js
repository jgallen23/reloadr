var gaze = require('gaze');
var server = require('../lib/server');

//watcher
var watch = function(folders) {
  gaze('**/*', function(err, watcher) {
    this.on('all', function(event, filepath) {
      console.log('File changed: '+ filepath);
      server.reload(filepath);
    });
  });
}



var public = {
  start: function(cb) {

    server.listen(function(err) {
      if (err) {
        throw err;
      }
      watch();
      if (cb) cb();
    });
  }
}

module.exports = public;
