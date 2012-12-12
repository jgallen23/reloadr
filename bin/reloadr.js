#!/usr/bin/env node

var fs = require('fs');
var version = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version

var reloadr = require('../lib/reloadr');

var opt = require('optimist')
    .usage('Reloadr '+ version +'\nUsage: $0 [dirs]')
    .options('v', {
      alias: 'version',
      descripe: 'Show version'
    })
    .options('h', {
      alias: 'help',
      descripe: 'Show help info'
    });

var argv = opt.argv;

if (argv.version) {
  return console.log(version);
}
if (argv.help) {
  return opt.showHelp(function(help) {
    console.log(help);
    console.log('Example dirs: example/*.js example/* example/**/*');
  });
}

var folders = argv._;

if (folders.length == 0) {
  folders.push('**/*');
}

reloadr.start(folders, function() {
  console.log('');
  console.log('LiveReload server started.  Watching: ' + folders.join(','));
  console.log('');
});

var timeout;
var files = [];
reloadr.changed(function(filepath) {
  console.log('\tFile changed: '+ filepath);
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(function() {
    console.log('');
  }, 1000);
});
