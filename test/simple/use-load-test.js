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
  it('uses chdir plugin', function(done) {
    carapace.use('chdir', done);
  });

  it('and uses heartbeat plugin', function(done) {
    carapace.use('heartbeat', done);
  });
});
