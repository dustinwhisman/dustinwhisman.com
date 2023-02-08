---
title: 'Eleventy Starter: Legacy JS Builds and TypeScript Support | Writing | Dustin Whisman'
description: This article is about supporting older browsers while still writing modern JS, and it extends what's already there to support TypeScript.
articleTitle: 'Building an Eleventy Starter Template: Legacy JS Builds and TypeScript Support'
layout: layout.njk
date: 2022-08-24
tags:
  - writing
  - eleventy starter template
---

# Building an Eleventy Starter Template: Legacy JS Builds and TypeScript Support

<p class="cmp-fine-print">
  This was originally published on the
  <a href="https://sparkbox.com/foundry">Sparkbox Foundry</a>.
  You can read
  <a href="https://sparkbox.com/foundry/eleventy_starter_repo_series_teaches_typescript_support_and_legacy_javascript_builds_for_legacy_browsers">the article on the Foundry</a>
  or go to the
  <a href="https://sparkbox.com/foundry/series/building_an_eleventy_starter_template">landing page for the whole series</a>.
</p>

{% include 'published-date.njk' %}

In the [last part of this series](../eleventy-starter-javascript), we added support for JavaScript to our template repository—including a modern build process, linting, and testing. This time, we’ll expand our support for older browsers by setting up a legacy JS build and updating our repo to support TypeScript.

If you just want to see the code or use the starter template, you can find the repo at [https://github.com/dustin-jw/eleventy-starter](https://github.com/dustin-jw/eleventy-starter). You can also see a snapshot of what the codebase looks like after following the steps in this article: [legacy-bundle](https://github.com/dustin-jw/eleventy-starter/tree/legacy-bundle) or [ts-support](https://github.com/dustin-jw/eleventy-starter/tree/ts-support) branches.

## Creating a Legacy Build Process

While modern browser support is very good these days—and the overwhelming majority of users will be able to use the modern JS bundles that we set up last time—we might as well make our template repo work for as many users as possible. If you know your audience is using the latest and greatest or if your browser support policy excludes older browsers, you can probably skip this step (or follow the instructions in reverse order to remove it if you used the template repo.)

However, it’s possible you may not know your audience as well as you think. Analytics tend not to work when JS fails to run, so older browsers may be underrepresented—and policies that exclude browsers also exclude the people who use them. So let’s go ahead and support those users. We’ll be making this build process _set it and forget it_, so there shouldn’t be too much maintenance after it’s in place.

### Setting up Webpack and Babel

We’ll be using [webpack](https://webpack.js.org/) and [babel](https://babeljs.io/) to handle our legacy build. We’ll need `babel` to convert our modern syntax into something older browsers can understand, and we’ll need `webpack` to bundle everything together. Let’s start by installing some dependencies.

```sh
npm install --save-dev webpack webpack-cli dotenv babel-loader
```

The `webpack-cli` package will let us run `webpack` from the command line. We can use `dotenv` to feed environment variables into our configuration file, and we need `babel-loader` to make `babel` work with `webpack`. Note that we already had `@babel/core` and `@babel/preset-env` installed from earlier. If you missed that step, go ahead and install those as well.

Now let’s add a `webpack.config.js` file to our project root and set it up for a minimal build process.

```js
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// return any files matching in the directory (non-recursively)
const getEntryPoints = (directory) =>
  fs
    .readdirSync(path.join(__dirname, directory))
    .filter((file) => !fs.statSync(path.join(directory, file)).isDirectory())
    .reduce(
      (entries, file) => ({
        ...entries,
        [file.split('.')[0]]: `./${directory}/${file}`,
      }),
      {},
    );

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: () => getEntryPoints('src/js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name].legacy.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

The `getEntryPoints` function allows us to have a dynamic set of entry points, so we don’t need to update the config every time we add a new file to the `src/js` folder. This maintains parity with the `src/js/*.js` glob in our `esbuild` commands.

Each `.js` file that is found gets run through `babel-loader`, which will compile it down to syntax that our supported browsers will understand. Those output files are written to `/dist`, but with their names changed such that they all end in `.legacy.js`.

With that in place, we can update our `package.json` to include `js:dev:legacy` and `js:build:legacy` scripts.

```json
"scripts": {
  "js:dev:legacy": "NODE_ENV=development webpack --progress -w",
  "js:build:legacy": "NODE_ENV=production webpack --progress"
}
```

These will function much like the `js:dev` and `js:build` scripts for our modern JS build process. The `dev` scripts will produce unminified code with source maps and they will watch for changes. The `build` scripts will run once, producing minified output without source maps.

If you run `npm run js:build:legacy` you should see a new file in your `dist` folder called `index.legacy.js`. Once we confirm that’s working, we can integrate these steps into our `start` and `build` scripts in `package.json`.

```json
"scripts": {
  "start": "run-p eleventy:dev sass:dev js:dev js:dev:legacy",
  "build": "run-s eleventy:build sass:build js:build js:build:legacy"
}
```

Unless you’re actively developing against an old browser, it’s probably not essential to include the legacy build in your `start` script. Feel free to remove it if you like, just be sure to test your production build on older browsers.

### Serving Different Code to Different Browsers

To support older browsers, we will be making use of the `module`/`nomodule` pattern which will let us serve modern JS to modern browsers and legacy JS to older browsers. We’ll have two script tags that use different attributes to communicate to browsers whether they should be used. Let’s update our `layout.njk` partial to follow this pattern.

```html
<script src="/index.js" type="module"></script>
<script src="/index.legacy.js" nomodule></script>
```

Modern browsers know to ignore `script` tags that have the `nomodule` attribute, so they will skip downloading the second script in this example and only use `index.js`. Older browsers won’t do anything with `script` tags that have a `type` they don’t understand, such as “module”. Similarly, they don’t know what `nomodule` means, but they also don’t care, so in this example, the browser will download and run `index.legacy.js`. From [caniuse.com](https://caniuse.com/es6-module), we can find out exactly which browsers do or do not support `type=”module”` which will help when we want to test our legacy bundles.

By having two mutually exclusive bundles, we get the best of both worlds. Modern browsers get slimmer, more efficient JS since it won’t include the bloat that comes from translating code to older syntax, and users on older browsers still get a functional experience.

### Targeting Browsers by Usage and Features

At this point, our legacy JS may not actually work for the browsers that we want. It will be using the default set of browsers and features as determined by `@babel/preset-env`, which means relatively recent browsers. However, for our `module`/`nomodule` strategy to work, we need to be targeting browsers that don’t support `type="module"`, which are much older than the default.

For this, we’ll use [`browserslist`](https://github.com/browserslist/browserslist). We don’t need to install anything for it, we just need to add a field in our `package.json` to configure it. `@babel/preset-env` will look for this field and use the configuration to determine how to compile down our JS.

```json
"browserslist": {
  ">0%",
  "not dead",
  "not supports es6-module"
}
```

This configuration will target any actively maintained browsers that also do not support ES6 Modules (t`ype="module"`). Setting “not dead” filters out any browsers that are officially unsupported or have not received updates for 2 years, and we can target specific features using the “supports” keyword in combination with features as tracked by [caniuse data](https://github.com/browserslist/caniuse-lite/tree/main/data/features). We went with `es6-modules` since that is the dividing line that we want for our bundles. `browserslist` needs a more generic query to begin with, and we’re trying to be inclusive here so that’s why we chose “>0%”. Feel free to tweak this configuration to suit your own needs using the [`browserslist` query documentation](https://github.com/browserslist/browserslist#full-list).

You can run `npx browserslist` to see which browsers match your configuration. If that list is empty, `webpack` will fail to build. Eventually as older browsers stop being supported, even our very permissive configuration may not match any browsers. That would be a good time to remove the legacy build process.

With this set up, we can run `npm run js:build:legacy` and see that our `index.legacy.js` file that gets created is using more widely supported syntax.

## Supporting TypeScript

We have a perfectly good JS support structure in place now, but we can take it one step further by adding support for TypeScript. If you don’t plan to use TypeScript on your projects, feel free to skip these steps (or follow them in reverse if you used the template repo.)

### Dependencies and Configuration

As usual, we’ll start by installing some dependencies. There will eventually be a lot of them, but we’ll cover them step-by-step as we add support for basic TypeScript support, linting, testing, and our legacy build.

```sh
npm install --save-dev typescript
```

Next, we’ll add a `tsconfig.json` file at the project root to configure our TypeScript settings. `esbuild` and other TypeScript libraries will know to look for this file and use its settings to determine how to compile TypeScript into JavaScript.

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

The options we’ve chosen here are pretty sensible defaults, but you can certainly change or add other [configuration options](https://www.typescriptlang.org/tsconfig) depending on your needs.

### Extending our Modern Build Process

Now let’s create some actual TypeScript files that we can use. We’ll follow the same pattern as we did with JavaScript, going with utility math functions that are imported into an entry point file. We’ll also rename `index.js` to `additive-math.js` for clarity.

```ts
// src/js/utilities/multiply.ts
export const multiply = (a: number, b: number): number => a * b;

// src/js/utilities/divide.ts
export const divide = (a: number, b: number): number => a / b;

// src/js/multiplicative-math.ts
import { multiply } from './utilities/multiply';
import { divide } from './utilities/divide';

console.log(`2 * 2 = ${multiply(2, 2)}`);
console.log(`2 / 2 = ${divide(2, 2)}`);
```

We need to update our `js:dev` and `js:build` scripts to look for `.ts` files as well as `.js` files otherwise our new TypeScript entry point will be ignored by our build process. Let’s update those scripts in `package.json`.

```json
"scripts": {
  "js:dev": "esbuild src/js/*.js  src/js/*.ts --format=esm --bundle=true --splitting=true --outdir=dist --watch --sourcemap=inline",
  "js:build": "esbuild src/js/*.js  src/js/*.ts --format=esm --bundle=true --splitting=true --outdir=dist --minify=true"
}
```

Now when we run `js:build`, we should end up with two files in our `dist` folder called `additive-math.js` and `multiplicative-math.js`, and they should be using relatively modern syntax.

### Linting TypeScript

We’ll also need to extend our linting setup to work with TypeScript. Let’s start with the dependencies.

```sh
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-typescript
```

The `@typescript-eslint` dependencies are necessary for `eslint` to understand TypeScript files, and `eslint-config-airbnb-typescript` is used to define our TypeScript-specific linting rules.

We need to update our `.eslintrc.json` file to support the new parser, plugins, and rulesets. It should look like this when we’re done.

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "tsconfigRootDir": ".",
    "project": ["./tsconfig.json"]
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "airbnb-typescript/base"
  ],
  "env": {
    "jest": true
  },
  "rules": {
    "import/prefer-default-export": 0
  }
}
```

We will also need to update our `lint:js` script in `package.json` to look for `.js` and `.ts` files.

```json
"scripts": {
  "lint:js": "eslint . --ext .js,.ts"
}
```

If we run `npm run lint:js` now, we should see some warnings about `console.log` statements and an error about using `requires` in `webpack.config.js`. Feel free to fix or disable any errors that pop up at this stage.

```js
// webpack.config.js

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
```

### Testing TypeScript

With linting supported, we can move on to supporting tests with TypeScript. Again, we’ll start by installing some dependencies.

```sh
npm install --save-dev @types/jest ts-jest
```

Now let’s add some tests, written in TypeScript, for our new math utility functions.

```ts
// src/js/utilities/divide.test.ts
import { divide } from './divide';

describe('divide', () => {
  it('divides two by two', () => {
    expect(divide(2, 2)).toEqual(1);
  });
});

// src/js/utilities/multiply.test.ts
import { multiply } from './multiply';

describe('multiply', () => {
  it('multiplies two by two', () => {
    expect(multiply(2, 2)).toEqual(4);
  });
});
```

Fortunately, we don’t have to change much about our configuration to get these tests working. All we need to do is add a field for `preset` to our `jest.config.js` file and set it to `ts-jest`.

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
```

Running `npm run test` now should run all of our JS and TS tests without any problems.

### Supporting TypeScript in our Legacy Build Process

The last thing to take care of is including TypeScript support in our legacy build process. Let’s install some dependencies again.

```sh
npm install --save-dev @babel/preset-typescript ts-loader
```

These will enable both `babel` and `webpack` to understand and process TypeScript files. Let’s update `.babelrc` to use the TypeScript preset.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

Then let’s update `webpack.config.js` to use `ts-loader` and to resolve both `.js` and `.ts` file extensions. The `module.exports` portion of the config should look like this in the end.

```js
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: () => getEntryPoints('src/js'),
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].legacy.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

Now if we run `npm run js:build:legacy`, we should see `additive-math.legacy.js` and `multiplicative-math.legacy.js` get created in our `dist` folder, and they should be using older syntax according to our `browserslist` settings.

## Using Blocks to Load Scripts Per Page

As a final flourish on our JS adventure, let’s use blocks (as discussed in the [HTML setup article](../eleventy-starter-html)) to load different scripts on different pages.

We’ll update `layout.njk` and correct the file names for our global scripts, and we’ll add a block called `scripts` that we can use on individual pages to drop in different scripts as needed.

```html
<!-- global scripts, should render on every page -->
<script src="/additive-math.js" type="module"></script>
<script src="/additive-math.legacy.js" nomodule></script>

<!-- page-specific scripts, should be set within the page template -->
{% raw %}{% block scripts %}{% endblock %}{% endraw %}
```

Then in another page, such as `about.njk`, we can add a `scripts` block and put in different scripts.

```html
{% raw %}{% block scripts %}
<script src="/multiplicative-math.js" type="module"></script>
<script src="/multiplicative-math.legacy.js" nomodule></script>
{% endblock %}{% endraw %}
```

If we run `npm start` and go to the home page (`http://localhost:8080`), we can see our addition and subtraction messages logged to the console. Then if we go to `/about`, we’ll see the same messages, but we’ll also see our multiplication and division messages logged as well.

Using blocks this way, we can serve as little JavaScript as necessary based on what the page needs.

## JavaScript Support: Robust and Flexible

Now we’re in a really good position to use our starter template. Our configuration and project structure are already super solid, we have a decent HTML structure we can extend, we have good CSS/SCSS support, and our JS support is robust, yet flexible. We can choose between JavaScript and TypeScript (or mix and match) with minimal effort, and we can adjust our browser support by changing a couple lines of configuration.

But we’re not done yet! Join us next time as we make our starter template PWA-ready out of the box.
