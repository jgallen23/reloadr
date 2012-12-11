var gaze = require('gaze');
var server = require('../lib/server');

//watcher
var watch = function(folders) {
  if (!folders || folders.length == 0) {
    return;
  }
  gaze(folders, function(err, watcher) {
    this.on('all', function(event, filepath) {
      console.log('File changed: '+ filepath);
      server.reload(filepath);
    });
  });
}



var public = {
  start: function(folders, cb) {

    server.listen(function(err) {
      if (err) {
        throw err;
      }
      watch(folders);
      if (cb) cb();
    });
  }
}

module.exports = public;
