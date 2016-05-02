var fixtureSteps = function() {
  this.Given(/^I am the true heir of the "([^"]*)" kingdom$/, function(kingdom) {
    return kingdom;
  });

  this.Then(/^Sam must right (\d+) wrongs of traditions ignored$/, function(count) {
    return count;
  });

  this.When(/^I prove to Odin my worth$/, function() {
    return true;
  });

  this.When(/^Shurima arises from the sands"$/, function() {
    return true;
  });

  this.When(/^Our glorious leader returns$/, function() {
    return true;
  });
};

module.exports = fixtureSteps;
