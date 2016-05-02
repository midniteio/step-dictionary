var fixtureSteps = function() {
  this.Given(/^A 3spooky5me skeltal$/, function() {
    return true;
  });

  this.When(/^my horn goes doot doot$/, function() {
    return true;
  });

  this.Then(/^(\d+) spooks will be had$/, function() {
    return true;
  });
};

module.exports = fixtureSteps;
