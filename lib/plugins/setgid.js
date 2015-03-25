var path = require('path');

module.exports = function setgidPlugin(carapace) {
  if (!carapace.setgid) {
    carapace.setgid = function (value, done) {
      try { process.setgid(value) }
      catch (ex) { return done ? done(ex) : null }

      carapace.cli.defaultOptions['setgid'].default = value;
      carapace.cli.defaultOptions['setgid'].required = true;
      return done ? done() : null;
    };
  }
};
