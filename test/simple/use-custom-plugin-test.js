/*
 * use-custom-plugin-test.js: Tests to ensure that custom-plugins load correctly
 *
 * (C) 2011 Nodejitsu Inc.
 *
 */

var assert = require('assert'),
    mocha = require('mocha'),
    path = require('path'),
    carapace = require('../../lib/carapace');

describe('carapace/simple/use-custom-plugin', function() {
  it('loads a custom plugin with an absolute path', function(done) {
    var plugin = path.join(__dirname, '..', 'fixtures', 'custom.js');
    carapace.use(plugin, function() {
      carapace.custom();
      carapace.once('custom', function(info) {
        assert(info.custom);
        done();
      });
    });
  });

  it('throws with a relative path', function () {
    assert.throws(function () {
      carapace.load('../fixtures/relative.js');
    });
  });
});
