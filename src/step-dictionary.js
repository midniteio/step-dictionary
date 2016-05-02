import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import glob from 'glob';
import generateReport from './generate-report';

module.exports = class StepDictionary {
  constructor(pathArg) {
    this.paths = this._getAllPaths(pathArg);
    this.stepDefinitions = this._getStepDefinitions();
  }

  getStepsJson() {
    return this.stepDefinitions;
  }

  getStepThatMatches(phrase) {
    return this.stepDefinitions.filter(function(stepDef) {
      return stepDef.regex.test(phrase);
    });
  }

  outputReport(outputPath) {
    let report = generateReport(this.stepDefinitions);
    fs.writeFileSync(outputPath, report);
  }

  _getStepDefinitions() {
    let stepDefinitions = [];

    this.paths.forEach((filePath) => {
      let fileData;

      try {
        fileData = fs.readFileSync(filePath, {encoding: 'utf8'});
      } catch (e) {
        console.log(path + ' could not be read, will skip and continue', e);
      }

      if (fileData) {
        let stepDefinitionMatches = fileData.match(/this.(Then|When|Given).*function\s?\(.*\)/g);
        if (stepDefinitionMatches) {
          stepDefinitionMatches.forEach((stepDefinition) => {
            let stepRegex = stepDefinition.match(/\/.*\//)[0];
            let lineNumber = fileData.substring(0, fileData.indexOf(stepRegex)).split('\n').length;
            let keyword = stepDefinition.substring(5, stepDefinition.indexOf('('));
            let regex = new RegExp(stepRegex.substring(1, stepRegex.length - 1));
            stepDefinitions.push({
              regex: regex,
              keyword: keyword,
              params: stepDefinition.match(/function\s?\(.*\)/)[0].match(/\(.*\)/)[0],
              file: filePath,
              line: lineNumber
            });
          });
        }
      }
    });

    return stepDefinitions;
  }

  _getAllPaths(pathArg) {
    let paths = (typeof pathArg === 'string') ? [pathArg] : pathArg;
    return _.flattenDeep(paths.map((filePath) => {
      if (path.parse(filePath).ext) {
        return path.resolve(filePath);
      } else {
        return glob.sync(path.join(filePath, '**', '*.js'));
      }
    }));
  }
};
