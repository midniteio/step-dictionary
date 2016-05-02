import chai from 'chai';
import fs from 'fs';
import StepDictionary from '../src/step-dictionary';

chai.should();

describe('StepDictionary', function(){
  it('should accept a single file path', function () {
    var stepDict = new StepDictionary('./test/fixtures/fixture-steps-1.js');
    return stepDict.getStepsJson().should.have.lengthOf(5);
  });

  it('should accept an array of paths', function () {
    var stepDict = new StepDictionary('./test/fixtures');
    return stepDict.getStepsJson().should.have.lengthOf(8);
  });
});

describe('StepDictionary.getStepsJson()', function(){
  it('should output the expected metadata', function () {
    var stepDict = new StepDictionary('./test/fixtures/fixture-steps-1.js');
    var expectedResults = [
      { regex: /^I am the true heir of the "([^"]*)" kingdom$/,
        keyword: 'Given',
        params: '(kingdom)',
        file: '/Users/ifleming/Dev/midniteio/cuke-defs/test/fixtures/fixture-steps-1.js',
        line: 2 },
      { regex: /^Sam must right (\d+) wrongs of traditions ignored$/,
        keyword: 'Then',
        params: '(count)',
        file: '/Users/ifleming/Dev/midniteio/cuke-defs/test/fixtures/fixture-steps-1.js',
        line: 6 },
      { regex: /^I prove to Odin my worth$/,
        keyword: 'When',
        params: '()',
        file: '/Users/ifleming/Dev/midniteio/cuke-defs/test/fixtures/fixture-steps-1.js',
        line: 10 },
      { regex: /^Shurima arises from the sands"$/,
        keyword: 'When',
        params: '()',
        file: '/Users/ifleming/Dev/midniteio/cuke-defs/test/fixtures/fixture-steps-1.js',
        line: 14 },
      { regex: /^Our glorious leader returns$/,
        keyword: 'When',
        params: '()',
        file: '/Users/ifleming/Dev/midniteio/cuke-defs/test/fixtures/fixture-steps-1.js',
        line: 18 }
    ];
    return stepDict.getStepsJson().should.deep.equal(expectedResults);
  });
});

describe('StepDictionary.outputReport()', function(){
  it('should create a report file', function () {
    var stepDict = new StepDictionary('./test/fixtures');
    stepDict.outputReport('output.html');
    try {
      return fs.readFileSync('output.html', {encoding: 'utf8'}).should.not.be.undefined;
    } catch (e) {
      return false;
    }
  });
});

describe('StepDictionary.getStepThatMatches()', function(){
  it('should return the step that matches the phrase', function () {
    var stepDict = new StepDictionary('./test/fixtures');
    return stepDict.getStepThatMatches('Sam must right 5 wrongs of traditions ignored')
      .should.have.lengthOf(1);
  });
});
