/*
 * use-test.js: Basic tests for the carapace module
 *
 * (C) 2011 Nodejitsu Inc
 * MIT LICENCE
 *
 */

var assert = require('assert'),
    path = require('path'),
    fork = require('child_process').fork,
    http = require('http'),
    request = require('request'),
    mocha = require('mocha'),
    carapace = require('../../lib/carapace');

var jail = path.join(__dirname, '..', '..', 'examples', 'app'),
    script =  path.join(jail, 'server.js');

describe('carapace/run/process', function() {
  it('spawns ./server.js in a separate process', function(done) {
      var child = fork(carapace.bin, [script]);

      child.on('message', function(info) {
        if (info.event === 'running') {
          assert.equal(info.data.script, script);
          request({ uri: 'http://localhost:1337' }, function(err, res, body) {
            child.kill();
            assert(!err);
            assert.equal(res.statusCode, 200);
            assert.equal(body, process.cwd());
            done();
          });
        }
      });
  });
});
