/*
 * net-dolisten-test.js: Basic tests for the lib/net.js module
 *
 * (C) 2011 stolsma
 * MIT LICENCE
 *
 */

var assert = require('assert'),
    path = require('path'),
    fork = require('child_process').fork,
    mocha = require('mocha'),
    carapace = require('../../lib/carapace');

var script = path.join(__dirname, '..', 'fixtures', 'eacces.js'),
    argv = ['--plugin', 'net', '--setuid', 'nobody', script];

describe('carapace/net/dolisten', function() {
  it('spawns the eacces.js script the child carapace', function(done) {
    var child = fork(carapace.bin, argv, { silent: false });

    child.on('message', function(info) {
      if (info.event == 'port') {
        assert.equal(info.data.addr, '127.0.0.1');
        assert.equal(info.data.desired, 80);
        assert.equal(info.data.port, 1024);
        child.kill();
      }
    });

    child.on('exit', function(code) {
      // 143 = 128 + 15, where 15 is the SIGTERM
      // See https://nodejs.org/api/process.html#process_signal_events
      assert.equal(code, 143);
      done();
    });
  });
});
