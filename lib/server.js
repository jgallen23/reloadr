var LRServer = require('livereload-server');
var fs = require('fs');
var path = require('path');


LRServer.prototype.reload = function(filepath) {
  for (var key in server.connections) {
    var conn = server.connections[key];
    try {
      conn.send({
        command: 'reload',
        path: filepath,
        liveCSS: true
      });
    } catch(e) {
      //console.log('error', e.message);
    }
  }
};

//LiveReload server
var server = new LRServer({ id: 'com.jga.reloadr', name: 'Reloadr', version: '1.0', protocols: { monitoring: 7, saving: 1 }});

server.on('livereload.js', function(request, response) {
  fs.readFile(path.join(__dirname, '../support/livereload.js'), 'utf8', function(err, data) {
    if (err) throw err;

    response.writeHead(200, {'Content-Length': data.length, 'Content-Type': 'text/javascript'});
    response.end(data);
  });
});

module.exports = server;
