---
title: 'Eleventy Starter: JavaScript - Writing - Dustin Whisman'
description: This article goes into detail about setting up a modern JS bundling process for an Eleventy project, including some details about linting and testing.
articleTitle: 'Building an Eleventy Starter Template: JavaScript'
layout: default
date: 2022-07-27
tags:
  - writing
  - eleventy starter template
---

# Building an Eleventy Starter Template: JavaScript

<p class="cmp-fine-print">
  This was originally published on the
  <a href="https://sparkbox.com/foundry">Sparkbox Foundry</a>.
  You can read
  <a href="https://sparkbox.com/foundry/building_javascript_into_my_github_starter_template_project">the article on the Foundry</a>
  or go to the
  <a href="https://sparkbox.com/foundry/series/building_an_eleventy_starter_template">landing page for the whole series</a>.
</p>

{% include 'partials/published-date.njk' %}

In the [previous part of this series](../eleventy-starter-css), we added CSS support to our template repository. This time, we will be adding support for JavaScript, including a modern bundling process, linting, and testing.

If you just want to see the code (or use the starter template), you can find the repo at [https://github.com/dustin-jw/eleventy-starter](https://github.com/dustin-jw/eleventy-starter). You can also see a snapshot of what the codebase looks like after following the steps in this article by going to the [js-support branch](https://github.com/dustin-jw/eleventy-starter/tree/js-support).

## Setting up the Modern JS Build Process

First, let’s add some sample JS files. These are placeholders meant to be replaced by more relevant code after you’ve created a repository from the template. For our purposes, we’ll write a minimal amount of code that will let us verify that our build process is working how we want it to.

We’ll follow the convention that any JS file at the `src/js` level will be an entry point, and any supporting JS that will be imported will go into subfolders, so let’s create `src/js` and `src/js/utilities` folders and add the following files to them.

```js
// src/js/utilities/add.js
export const add = (a, b) => a + b;

// src/js/utilities/subtract.js
export const subtract = (a, b) => a - b;

// src/js/index.js
import { add } from './utilities/add';
import { subtract } from './utilities/subtract';

console.log(`2 + 2 = ${add(2, 2)}`);
console.log(`2 - 2 = ${subtract(2, 2)}`);
```

We now have an entry point at `src/js/index.js` that imports the functions from the other two files. We’ve chosen simple math operations—since those will be easy to test—and we’re logging the results to the console so we’ll be able to easily verify that the code is working as expected in the browser.

We’re also using some modern syntax (ES Modules, string interpolation, and arrow functions) that won’t work in older browsers, which will let us confirm that our legacy bundle works. But we’ll get to that later. First, let’s get the primary build working!

## Modern Bundles with `esbuild`

For our bundler, we will be using [`esbuild`](https://esbuild.github.io/). Why `esbuild` instead of something like [`webpack`](https://webpack.js.org/) or [`rollup`](https://rollupjs.org/guide/en/)?

1. It’s fast
1. We can use its CLI for what we need without any configuration files
1. It supports TypeScript out of the box (we’ll get to TypeScript support later)

Let’s install `esbuild`, then set up a script in `package.json` to build our example JS.

```sh
npm install --save-dev esbuild
```

```json
"scripts": {
  "js": "esbuild src/js/*.js --format=esm --bundle=true --splitting=true --outdir=dist"
}
```

When we run `npm run js`, we should see a new file in `dist` called `index.js` which contains our lightly-processed JS. However, we’ll want to treat our JS build similar to our SCSS build, where we include source maps and watch for changes in development mode, and we minify the production build.

Let’s replace that `js` script with `js:dev` and `js:build` scripts and incorporate those into our existing `start` and `build` scripts.

```json
"scripts": {
  "start": "run-p eleventy:dev sass:dev js:dev",
  "build": "run-s eleventy:build sass:build js:build",
  "js:dev": "esbuild src/js/*.js --format=esm --bundle=true --splitting=true --outdir=dist --watch --sourcemap=inline",
  "js:build": "esbuild src/js/*.js --format=esm --bundle=true --splitting=true --outdir=dist --minify=true"
}
```

Now when we run `npm run build`, minified JS files will be written to the `dist` folder, and `npm start` will watch our JS files for changes. We will also need to update `.eleventy.js` to tell Eleventy to watch those files to get it to reload the page automatically when JS files change.

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/scss/');
  eleventyConfig.addWatchTarget('./src/js/');

  return {
    dir: {
      input: 'src/pages',
      output: 'dist',
      includes: '../partials',
    },
  };
};
```

## Loading Modern JS in our HTML

Now that we have a modern JS build process working, let’s put a `script` tag in our `layout.njk` partial just before the closing `</body>` tag.

```html
<script src="/index.js" type="module">
```

If we run `npm start` and visit `http://localhost:8080`, we’ll be able to see our messages logged to the console. Note that since we’re using modern syntax (`import` statements, string interpolation, and arrow functions), we’ll need to use the `type="module"` attribute. This will work in all modern browsers, but older browsers won’t even attempt to download the file, let alone run it.

Following the [death of IE11](https://www.npr.org/2021/05/22/999343673/internet-explorer-the-love-to-hate-it-web-browser-will-die-next-year), a modern-only approach may be sufficient for your audience, but there are still [browsers in the wild](https://blog.jim-nielsen.com/2022/a-web-for-all/) that won’t support modern JS. So we’ll eventually want to support a legacy JS build as well. We’ll get to that in the next part of the series, but let’s wrap up our basic JS support first, starting with linting.

## Linting Our JS

We want to ensure that the JS that we write is high quality and written consistently. For this, we’ll use [`eslint`](https://eslint.org/), and we’ll go with the popular [`eslint-config-airbnb`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) configuration. Let’s start by installing some dependencies.

```sh
npm install --save-dev eslint eslint-config-airbnb
```

We’ll need to do some configuration to let `eslint` know what rules to use. Let’s create a file in our root directory called `.eslintrc.json`.

```json
{
  "root": true,
  "extends": ["eslint:recommended", "airbnb-base"],
  "rules": {
    "import/prefer-default-export": 0
  }
}
```

This will use the rules that `eslint` recommends, as well as the rules that the `airbnb-base` config uses. To demonstrate how to override a rule, I have disabled the `import/prefer-default-exports` rule, since the JS we have set up already is using named exports.

We don’t want `eslint` evaluating our dependencies or production output, so let’s add another file called `.eslintignore`. This works the same way as `.gitignore`. Any files or directories added to it will be ignored by `eslint`.

```sh
node_modules
dist
```

Finally, let’s add to our linting scripts in `package.json`. We’ll want a standalone script for just linting JS, and we’ll want to add that to our catch-all `lint` script.

```json
"scripts": {
  "lint": "run-s lint:html lint:css lint:js",
  "lint:js": "eslint . --ext .js"
}
```

The command tells `eslint` to evaluate all files starting at the root directory that use the `.js` extension. If we run `npm run lint:js` now, we should see some warnings about our `console.log` statements, but no errors.

Now that we have linting to catch code style problems, let’s add some support for testing so that we can confirm that our code does what we want it to do.

## Testing our JS

We’ll use [Jest](https://jestjs.io/) as our test runner. Let’s start by installing some dependencies.

```sh
npm install --save-dev jest jest-environment-jsdom babel-jest @babel/core @babel/preset-env
```

Let’s break down what each of these are and why we need them:

- `jest` is the test runner
- `jest-environment-jsdom` lets us specify that our JS is meant to run in browsers and lets us use DOM-specific methods in our tests
- `babel-jest` and `@babel/core` are necessary for `jest` to be able to understand ESM-style imports (annoyingly)
- `babel-preset-env` is needed to specify the target environment for `babel` to transform our code to for testing

We need to do some configuration here, so let’s create a file called `jest.config.js`.

```js
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
```

All we need now is a `test` script in our `package.json`.

```json
"scripts": {
  "test": "jest"
}
```

Running `npm run test` (or just `npm test`) will run our tests, which should succeed if all goes well.

## To Be Continued…

We’re nearly done with JS support, but we can go further. We will probably want a legacy build process to support older browsers, and we might want to use TypeScript instead of, or in addition to, regular old JavaScript. We’ll cover that next time, so see you then!
