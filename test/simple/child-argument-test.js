/*
 * child-argument-test.js: Basic child argument rewrite tests
 *
 * (C) 2011 stolsma
 * MIT LICENCE
 *
 */

var assert = require('assert'),
    path = require('path'),
    spawn = require('child_process').spawn,
    mocha = require('mocha'),
    carapace = require('../../lib/carapace');

var script = path.join(__dirname, '..', 'fixtures' ,'checkchildargs.js'),
    testPort = 8000,
    checkargs = ['argument', '-a', 'aargument', '--test', 'testargument'];
    argv = [script];

describe('carapace/simple/child-argument', function() {
    it('spawns the checkchildargs.js script via the child carapace', function(done) {
        var args = '';
        var child = spawn(carapace.bin, argv.concat(checkargs));

        child.stdout.on('data', function (data) {
          args += data;
        });

        child.on('exit', function(code) {
          assert.equal(code, 0);
          var childargs = JSON.parse(args);

          // First two are reference to node and the script itself
          var node = childargs.splice(0, 1);
          var resultScript = childargs.splice(0, 1);
          assert.equal(resultScript, script);
          assert.deepEqual(childargs, checkargs);
          done()
        });
    });
});
