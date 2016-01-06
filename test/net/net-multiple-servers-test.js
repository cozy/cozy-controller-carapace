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

var script = path.join(__dirname, '..', 'fixtures', 'multi-server.js'),
    testPort = 8000,
    argv = ['--plugin', 'net', script];

describe('carapace/net/dolisten', function() {
  it('spawns the server-dolisten script the child carapace', function(done) {
    var events = [];
    var child = fork(carapace.bin, argv, { silent: false });

    child.on('message', function(info) {
      if (info.event == 'port') {
        events.push(info.data);
      }
    });

    child.on('exit', function(code) {
      assert.equal(code, 0);
      // process all events before asserting
      process.nextTick(function() {
        var desired = testPort, port = desired;
        assert.equal(events.length, 3);
        events.forEach(function(event) {
          assert.equal(event.desired, desired);
          assert.equal(event.port, port++);
        });
        done();
      });
    });
  });
});
