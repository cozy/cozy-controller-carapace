/*
 * use-test.js: Basic tests for the carapace module
 *
 * (C) 2011 Nodejitsu Inc
 * MIT LICENCE
 *
 */

var assert = require('assert'),
    mocha = require('mocha'),
    carapace = require('../../lib/carapace');

describe('carapace/simple/use-plugins', function() {
  it('loads up chdir, heartbeat plugins', function(done) {
    var plugins = [
      carapace.load('chdir'),
      carapace.load('heartbeat')
    ];
    carapace.use(plugins, done);
  });

  it('and runs the heartbeat plugin', function(done) {
    carapace.once('heartbeat', function() {
      assert.equal(carapace.event, 'heartbeat');
      done();
    });
    carapace.heartbeat();
  });
});
