var path = require('path');

module.exports = function setgroupsPlugin(carapace) {
  if (!carapace.setgroups) {
    carapace.setgroups = function (value, done) {
      try { process.setgroups([value]) }
      catch (ex) { return done ? done(ex) : null }

      carapace.cli.defaultOptions['setgroups'].default = value;
      carapace.cli.defaultOptions['setgroups'].required = true;
      return done ? done() : null;
    };
  }
};