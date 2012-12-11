#!/usr/bin/env node


var reloadr = require('../lib/reloadr');

reloadr.start(function() {
  console.log('LiveReload server started');
});
