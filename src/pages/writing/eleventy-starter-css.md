---
title: "Eleventy Starter: CSS | Writing | Dustin Whisman"
description: This article covers supporting CSS, or SCSS more specifically, in an Eleventy project.
articleTitle: "Building an Eleventy Starter Template: CSS"
layout: layout.njk
date: 2022-06-15
tags: writing
---

# Building an Eleventy Starter Template: CSS

<p class="cmp-fine-print">
  This was originally published on the
  <a href="https://sparkbox.com/foundry">Sparkbox Foundry</a>.
  You can read
  <a href="https://sparkbox.com/foundry/building_css_support_into_my_github_starter_template_project">the article on the Foundry</a>
  or go to the
  <a href="https://sparkbox.com/foundry/series/building_an_eleventy_starter_template">landing page for the whole series</a>.
</p>

<p class="cmp-fine-print">
  Published:
  <time datetime="{{ page.date.toISOString() }}">
    {{ page.date.toLocaleDateString(undefined, { timeZone: 'UTC' }) }}
  </time>
</p>

In the [last part of this series](../eleventy-starter-html), we added support for dynamic HTML to our template repository. In this article, we will add support for CSS, authored in SCSS.

If you just want to see the code (or use the starter template), you can find the repo at [https://github.com/dustin-jw/eleventy-starter](https://github.com/dustin-jw/eleventy-starter). You can also see a snapshot of what the codebase looks like after following the steps in this article by going to the [scss branch](https://github.com/dustin-jw/eleventy-starter/tree/scss).

## Setting up SCSS

First, we’ll install [`sass`](https://sass-lang.com/dart-sass), the library we’ll use to compile our SCSS into CSS.

```sh
npm install --save sass
```

In our `src` directory, let’s add a folder called `scss`, then create a `styles.scss` file inside that. This will act as the entry point that `sass` will use to compile our styles to CSS. Our HTML content thus far is mostly in `h1` and `p` tags, so let’s add some styles that will be obvious once our build process is working.

```scss
h1 {
  color: hotpink;
}

p {
  color: rebeccapurple;
}
```

In our `package.json` file, we will add a script to compile our SCSS.

```json
"scripts": {
  "sass": "sass src/scss:dist"
}
```

The format of the script is `sass <inputPath>:<outputPath>`, so we’re telling `sass` to compile whatever `.scss` files that it finds (except for ones starting with underscores) in `src/scss` and write the output to `dist`. Let’s double-check that it works.

```sh
npm run sass
```

You should see a new file in your `dist` folder called `styles.css`, and it should contain the `h1` and `p` styles we defined earlier.

## Development and Production CSS

Now that we have a working script for building our CSS, let’s incorporate that into our development and production build processes. We probably want to treat CSS differently when we’re developing locally vs. production, so let’s use some options that the `sass` CLI gives us to enhance our CSS builds.

```json
"scripts": {
  "sass:dev": "sass --watch --embed-source-map src/scss:dist",
  "sass:build": "sass --no-source-map --style=compressed src/scss:dist"
}
```

Here, we’ve split the `sass` script into two variations. The `sass:dev` script will recompile our styles whenever files change in the `src/scss` directory and will include source maps to make development easier.

The `sass:build` script will remove any unnecessary whitespace from our CSS and won’t include source maps, both of which will keep file size down in production.

## Running Scripts in Parallel

As it is right now, we would need to use multiple terminals to run our `start` and `sass:dev` scripts, which is not ideal. Let’s change things up so that running `npm start` runs all of our development build steps, and `npm run build` runs all of our production build steps.

First, we’ll install `npm-run-all`, which is an npm package that allows us to easily run scripts in parallel or in sequence.

```sh
npm install --save-dev npm-run-all
```

We’ll also update our `package.json`, adding and renaming some scripts.

```json
"scripts": {
  "start": "run-p eleventy:dev sass:dev",
  "build": "run-s eleventy:build sass:build",
  "eleventy:dev": "eleventy --serve",
  "eleventy:build": "eleventy",
  "sass:dev": "sass --watch --embed-source-map src/scss:dist",
  "sass:build": "sass --no-source-map --style=compressed src/scss:dist"
}
```

We renamed the scripts responsible for running `eleventy` so that we could use `start` and `build` to handle the steps needed for the whole site. This will come in handy later when we add JavaScript support.

Now when you run `npm start`, both the `eleventy:dev` and `sass:dev` scripts will run simultaneously (`run-p` is shorthand for running in parallel). When you run `npm run build`, `eleventy:build` will run before `sass:build` runs (`run-s` is shorthand for running in sequence).

## Referencing Styles from Our HTML Layout

Now that we have our SCSS being compiled and written to `dist/styles.css`, we need to use those styles on the site itself. We’ll modify `layout.njk`, adding a `link` tag for the stylesheet.

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>{% raw %}{{ title }}{% endraw %}</title>
  <meta name="description" content="{% raw %}{{ description }}{% endraw %}">

  <!-- TODO: add link tags, other meta tags, open graph info, etc. -->
  <link rel="stylesheet" href="/styles.css">
</head>
```

If you run `npm start` and open the site (`http://localhost:8080`), you should see a bright pink heading followed by a purple paragraph. However, you may notice that if you change `styles.scss`, the page doesn’t reload, even though `sass` recompiled the styles. We can fix that by updating our `.eleventy.js` file.

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/scss/');

  return {
    dir: {
    input: 'src/pages',
    output: 'dist',
    includes: '../partials',
    },
  };
};
```

The [`addWatchTarget` function](https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets) tells `eleventy` that it should reload whenever there are changes to files in a directory.

## Linting Our SCSS

Before we move on to adding JavaScript support, we should set up linting for our SCSS to ensure decent code quality. We’ll use [stylelint](https://stylelint.io/) for this, and we’ll use [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss) to define the rules we want to follow. Let’s go ahead and install those packages.

```sh
npm install --save-dev stylelint stylelint-config-standard-scss
```

We’ll need to configure `stylelint` with some basic rules, so we’ll add a `.stylelintrc.json` to our project’s root directory.

```json
{
  "extends": [
    "stylelint-config-standard-scss"
  ],
  "rules": {
    "function-no-unknown": null,
    "string-quotes": "single"
  }
}
```

This configuration will use all of the rules that are defined in `stylelint-config-standard-scss`, and we can overrule any individual rules according to our preferences. In this case, I disabled the `function-no-unknown` rule so I can define and use custom functions, and I prefer single quotes around strings. Feel free to adjust rules as needed, according to your preferences.

With `stylelint` installed and configuration in place, we can add a `lint:css` script to our `package.json`, similar to how we set up the `lint:html` script last time.

```json
"scripts": {
  "lint:html": "pa11y-ci -c .pa11yci.json './dist/**/*.html'",
  "lint:css": "stylelint 'src/scss/**/*.scss' --color --formatter verbose"
}
```

If we run `npm run lint:css` on our minimal SCSS, we should see output that lets us know that we don’t have any errors.

Now that we have more than one linting script set up, we can take advantage of the `npm-run-all` work that we did earlier, and set up a `lint` script that will run both `lint:html` and `lint:css`. For bonus points, we can also ensure that our HTML linting is running against the production build of our site by adding a `prelint:html` script.

```json
"scripts": {
  "lint": "run-s lint:html lint:css",
  "prelint:html": "npm run build",
  "lint:html": "pa11y-ci -c .pa11yci.json './dist/**/*.html'",
  "lint:css": "stylelint 'src/scss/**/*.scss' --color --formatter verbose"
}
```

Now we’ll be able to lint our HTML and our CSS all in one go by running `npm run lint`, but we still have the option to only run one or the other as needed.

## Building Out More SCSS

For this template repo, I organized my default styles following [ITCSS conventions](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/), so my `src/scss` folder contains the following folders:

* `settings`: variables used elsewhere
* `tools`: functions and mixins
* `generic`: CSS resets and low-specificity styles
* `elements`: default styles for HTML tags, such as h1, p, ul, etc.
* `components`: specific component styles (for the starter template, these are mostly layout components)
* `utilities`: helpful utility styles

The details of those default styles are beyond the scope of this series, but for the curious, you can see the boilerplate styles I used in the [repo](https://github.com/dustin-jw/eleventy-starter/tree/main/src/scss).

## Including Third-Party SCSS

For my starter template, I’m sticking with custom styles but to demonstrate how you might incorporate a library, let’s walk through how you would use [Bootstrap](https://getbootstrap.com/) with this setup. First, we’ll install Bootstrap.

```sh
npm install --save bootstrap
```

[Bootstrap’s customization documentation](https://getbootstrap.com/docs/5.1/customize/sass/) mentions creating an entry point that imports only the parts of Bootstrap that you need. To do this, we’ll find `node_modules/bootstrap/scss/bootstrap.scss` and copy its contents to `src/scss/vendor/_bootstrap.scss`.

This lets us customize how we use Bootstrap without copying all of its source code into our repo, which will also give us an easier upgrade path when Bootstrap releases updates. However, we will need to update the `@import` statements to point to `node_modules`.

```scss
// the '../../../' takes us back to the root of our project from `src/scss/vendor`
@import '../../../node_modules/bootstrap/scss/functions';
@import '../../../node_modules/bootstrap/scss/variables';
@import '../../../node_modules/bootstrap/scss/mixins';
@import '../../../node_modules/bootstrap/scss/utilities';

// more @imports
```

Then we can import our custom Bootstrap files into our `styles.scss` entry point, ideally before our custom styles so we can override Bootstrap with our own styles.

You can see the full implementation in the [bootstrap branch of the repo](https://github.com/dustin-jw/eleventy-starter/tree/bootstrap). I also created a branch detailing how to include Tailwind, if that’s more your style. You can see the code for that in the [tailwind branch](https://github.com/dustin-jw/eleventy-starter/tree/tailwind).

## Wrapping It Up in Style

This template repo is really coming together now. To recap, we have a solid project structure that’s easy to navigate, extendable HTML that simplifies creating and customizing new pages, and a flexible SCSS build system that can handle both custom and third-party styles with ease.

Join us next time, when we’ll be adding support for JavaScript!
