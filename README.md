## dustinwhisman.com

Welcome to the source code for my personal site! Take a look around, see how things work, maybe even run it yourself if you feel like it. Just don't pretend to be me. That would be weird.

## Getting Started

You will need [Node.js](https://nodejs.org/en/) installed, along with `npm`, and they should match the version range given in the `engines` field in `package.json`.

```sh
# install dependencies
npm install

# run the app
npm start

# build the site for production
npm run build

# run linters all at once
npm run lint

# or run linters individually
npm run lint:css
npm run lint:js
npm run lint:html

# run tests once
npm run test

# run tests in "watch" mode
npm run test -- --watch

# run tests and generate a coverage report
npm run test -- --coverage

# update any outdated npm dependencies
npm run update-deps
```
