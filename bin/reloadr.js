#!/usr/bin/env node


var reloadr = require('../lib/reloadr');

var folders = [];
for (var i = 2, c = process.argv.length; i < c; i++) {
  var item = process.argv[i];
  folders.push(item);
}

if (folders.length == 0) {
  folders.push('**/*');
}

reloadr.start(folders, function() {
  console.log('LiveReload server started.  Watching: ' + folders.join(','));
});
