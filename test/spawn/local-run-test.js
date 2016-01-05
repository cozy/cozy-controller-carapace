/*
 * use-test.js: Basic tests for the carapace module
 *
 * (C) 2011 Nodejitsu Inc
 * MIT LICENCE
 *
 */

var assert = require('assert'),
    path = require('path'),
    exec = require('child_process').exec,
    http = require('http'),
    request = require('request'),
    mocha = require('mocha'),
    carapace = require('../../lib/carapace');

var script = path.join(__dirname, '..', '..', 'examples', 'app', 'server.js');

describe('carapace/spawn/local', function() {
  it('runs ./server.js with the net plugin', function(done) {
    carapace.use(path.resolve(__dirname, '..', '..', 'lib', 'plugins', 'net'));
    carapace.net([], function() {
      carapace.on('running', function() {
        assert.equal(carapace.event, 'running');
        assert.equal(process.argv[1], script);
        assert.equal(carapace._module.exports.port, 1337);
        carapace.on('port', function(info) {
          assert.equal(carapace.event, 'port');
          assert.equal(info.desired, 1337);
          request({ uri: 'http://localhost:' + info.port }, function(err, res, body) {
            assert.equal(body, process.cwd());
            done();
          });
        });
      });
      carapace.argv = [];
      carapace.script = script;
      carapace.run();
    });
  });
});
