# step-dictionary

##### step-dictionary is a utility to aid the in the discoverability of cucumber-js step definitions. #####
It is a lightweight module, consisting of a StepDictionary class that is instantiated with a given set of paths (likely your `--require` path(s), or your `features` directory). For example:
```
var StepDictionary = require('step-dictionary');
var myDict = new StepDictionary('/path/to/my/files');
```
 It exposes three functions:
- `myDict.getStepsJson()` : returns an object of all step definitons and metadata about them
- `myDict.getStepThatMatches(phrase)` : Given a phrase, returns the step definition that matches that phrase
- `myDict.outputReport(path)` : Creates an HTML report of the step definitions found.

**Example of the report output and filtering:**

![report filtering](http://i.giphy.com/uJBjBeO4diQ3S.gif)


#### Developing with step-dictionary ####
step-dictionary is written in es6 that is transpiled via Babel. This happens on npm-install, where the compiled code is output to the `distribution` folder. If making changes, `npm run build` will re-compile the code. step-dictionary uses travis-ci for linting and unit testing, which performs `npm test` on all PR's prior to merging with the expectation that they pass.
