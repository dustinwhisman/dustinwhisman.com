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

## Optimizing Images

To optimize images, paste a batch of `jpg` images into a folder at the root called `pictures-of-cats`. Then run any of these scripts to optimize them.

```sh
# do everything in one go
npm run optimize-images

# only optimize in jpg format
npm run images:jpg

# only optimize in webp format
npm run images:webp

# only optimize in avif format
npm run images:avif

# remove all jpg images from the `pictures-of-cats` folder
npm run images:clean
```

## Cypress Testing

To run Cypress tests locally, you will need to create a `.env` file. Use `.env.example` as a starting point for filling in the variables you need. `BASE_URL` should point to where the site is running, typically `http://localhost:8080`, but you can point it at the production site or a deploy preview for some manual testing.

For local testing, you will need to have the site running already (`npm start`), then in a different terminal, you can run `npm run test:e2e` to run the Cypress tests.
