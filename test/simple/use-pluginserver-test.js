/*
 * use-pluginserver-test.js: Tests to ensure that custom plugins which start servers load correctly
 *
 * (C) 2011 Nodejitsu Inc.
 *
 */

var assert = require('assert'),
    mocha = require('mocha'),
    path = require('path'),
    request = require('request'),
    carapace = require('../../lib/carapace');

describe('carapace/simple/use-pluginserver', function() {
  it('loads a custom plugin that starts a server', function(done) {
    var plugin = path.join(__dirname, '..', 'fixtures', 'pluginserver.js');
    carapace.use(plugin, function() {
      carapace.pluginserver(null, function() {
        request({ uri: 'http://localhost:31337' }, function(err, res, body) {
          assert(!err);
          assert.equal(body, 'from-pluginserver');
          done();
        });
      });
    });
  });
});
