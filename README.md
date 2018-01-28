# copy-paste-component

[![travis](https://img.shields.io/travis/GabrielDuarteM/copy-paste-component/master.svg)](https://travis-ci.org/GabrielDuarteM/copy-paste-component)
[![appveyor](https://img.shields.io/appveyor/ci/gabrielduartem/copy-paste-component/master.svg)](https://ci.appveyor.com/project/GabrielDuarteM/copy-paste-component)
[![codecov](https://img.shields.io/codecov/c/github/GabrielDuarteM/copy-paste-component.svg)](https://codecov.io/gh/GabrielDuarteM/copy-paste-component)
[![npm downloads](https://img.shields.io/npm/dw/copy-paste-component.svg)](https://www.npmjs.com/package/copy-paste-component)
[![npm version](https://img.shields.io/npm/v/copy-paste-component.svg)](https://www.npmjs.com/package/copy-paste-component)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A tool to create components, by copying and pasting existing ones.
If you have the structure below:

```
src/components/App/App.js
src/components/App/App.test.js
src/components/App/App.stories.js
src/components/App/index.js
```

and run the tool, it will create the following structure, replacing occurrences of the word `App` inside the files to `NewApp`:

```
src/components/NewApp/NewApp.js
src/components/NewApp/NewApp.test.js
src/components/NewApp/NewApp.stories.js
src/components/NewApp/index.js
```

## Installation

`yarn global add copy-paste-component` or `npm i -g copy-paste-component`

## Usage

On the root of your project, run `cpc` or `copy-paste-component`.

It will prompt you three questions:

* `Which component would you like to copy?`
* `What is the name of the new component?`
* `What is the location of the new component?`

When you answer those questions, it will generate a structure that is the same as the one that the selected component uses, but it will change the filename to the one you provided on the second question.
It will look too inside the file for occurrences of the filename, and if it finds, it replaces with the content of the second question.

So, given the following file:

### App.js

```js
import React from "react"

const App = () => <div>Hello World</div>

export default App
```

Becomes the following:

### NewApp.js

```js
import React from "react"

const NewApp = () => <div>Hello World</div>

export default NewApp
```

There is also an option to skip the questions, providing them directly when you call the package, using the `copy` command, like `cpc copy src/components/App/App.js NewApp src/components/NewApp`. The first argument is the `path of component you want to copy`, the second is the `name of the new component`, and the last one is the `path where the component will be created`.

![Usage](https://thumbs.gfycat.com/ColorlessSelfassuredDonkey-max-14mb.gif)

## Roadmap

* [x] Make it work with components using sub folders (e.g. `App/App.js`)
* [x] Make it work with components not using sub folders (e.g. just `App.js`)
* [x] Add tests coverage
* [ ] Accept arguments that answer the three initial questions
* [ ] Integrate with editors (Initially just VSCode, but you can suggest more at the issues page)
* [ ] Prompt which files to copy
* [ ] Make it work with ... (you can suggest more use cases at the issues page)

## Changelog

See [Releases](https://github.com/GabrielDuarteM/copy-paste-component/releases)

## License

MIT
