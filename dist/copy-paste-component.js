#! /usr/bin/env node
"use strict";

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _inquirer = require("inquirer");

var _path = require("path");

var _fsExtra = require("fs-extra");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const walkSync = (dir, filelist = []) => {
  const dirSanitized = dir[dir.length - 1] !== "/" ? `${dir}/` : dir;

  const files = (0, _fsExtra.readdirSync)(`${dirSanitized}`);

  let filelistReturn = filelist;

  files.forEach(file => {
    if ((0, _fsExtra.statSync)(dirSanitized + file).isDirectory()) {
      filelistReturn = walkSync(`${dirSanitized + file}/`, filelist);
    } else {
      filelistReturn.push(`${dirSanitized + file}`);
    }
  });
  return filelistReturn;
};

const getFolderComponent = componentToBeCopied => {
  const componentBasename = (0, _path.basename)(componentToBeCopied, (0, _path.extname)(componentToBeCopied));

  const parentPath = (0, _path.dirname)(componentToBeCopied);
  const parentBasename = (0, _path.basename)(parentPath);

  return parentBasename === componentBasename ? (0, _path.dirname)(parentPath) : parentPath;
};

const readWriteSync = (fileSrc, fileDest, componentNameOriginal, newComponentName) => {
  const data = (0, _fsExtra.readFileSync)(fileSrc, "utf-8");

  const newValue = data.replace(new RegExp(`(\\W|^)(${componentNameOriginal})(\\W|$)`, "g"), (match, p1, p2, p3) => `${p1}${newComponentName}${p3}`);

  (0, _fsExtra.ensureDirSync)((0, _path.dirname)(fileDest));

  (0, _fsExtra.writeFileSync)(fileDest, newValue, "utf-8");
};

(0, _glob2.default)("!(node_modules)**/{components,containers}/**/!(index|*.test*|*.stories*)*.{js,jsx,tsx}", (() => {
  var _ref = _asyncToGenerator(function* (err, matches) {
    if (err) {
      throw err;
    }

    const answers = yield (0, _inquirer.prompt)([{
      name: "componentToBeCopied",
      message: "Which component would you like to copy?",
      choices: matches,
      type: "list"
    }, {
      name: "componentName",
      message: "What is the name of the new component?",
      validate: function validate(input) {
        return input ? true : "Inform a valid name for the component";
      }
    }, {
      name: "componentLocation",
      message: "What is the location of the new component?",
      type: "input",
      default: function _default({ componentToBeCopied }) {
        return getFolderComponent(componentToBeCopied);
      }
    }]);

    const files = walkSync((0, _path.dirname)(answers.componentToBeCopied));
    const componentNameOriginal = (0, _path.basename)(answers.componentToBeCopied, (0, _path.extname)(answers.componentToBeCopied));
    const filesRenamed = files.map(function (file) {
      const x = file.replace(new RegExp(componentNameOriginal, "g"), answers.componentName);
      return x;
    });

    for (let i = 0; i < filesRenamed.length; i += 1) {
      readWriteSync(files[i], filesRenamed[i], componentNameOriginal, answers.componentName);
    }

    console.log(`\nComponent ${answers.componentName} successfully created at ${(0, _path.dirname)(filesRenamed[0])}`);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());