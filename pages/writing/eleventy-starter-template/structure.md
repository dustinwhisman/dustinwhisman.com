---
title: 'Eleventy Starter: Project Setup - Writing - Dustin Whisman'
description: This article covers the basics of setting up an Eleventy project's file structure and basic configuration.
articleTitle: 'Building an Eleventy Starter Template: Project Setup and Configuration'
layout: default
date: 2022-04-06
tags:
  - writing
  - eleventy starter template
---

# Building an Eleventy Starter Template: Project Setup and Configuration

<p class="cmp-fine-print">
  This was originally published on the
  <a href="https://sparkbox.com/foundry">Sparkbox Foundry</a>.
  You can read
  <a href="https://sparkbox.com/foundry/setting_up_my_project_to_build_a_github_starter_template_and_create_HTML_page">the article on the Foundry</a>
  or go to the
  <a href="https://sparkbox.com/foundry/series/building_an_eleventy_starter_template">landing page for the whole series</a>.
</p>

{% include 'partials/published-date.njk' %}

In the [introduction to this series](../eleventy-starter-intro), we set some goals for an ideal starter template using Eleventy. In this entry, we’ll go over how to set up the project structure and configuration. At the end, we’ll build our first HTML page.

If you just want to see the code (or use the starter template), you can find the repo at [https://github.com/dustin-jw/eleventy-starter](https://github.com/dustin-jw/eleventy-starter). You can also see a snapshot of what the codebase looks like after following the steps in this article by going to the [project-setup-and-configuration branch](https://github.com/dustin-jw/eleventy-starter/tree/project-setup-and-configuration).

## Setting up the Project

Like any project, we need to take care of some basic project setup tasks.

```sh
# create a new folder for the project
mkdir eleventy-starter

# change working directory to the new folder
cd eleventy-starter

# initialize a new git repo
git init

# initialize npm with default options
npm init -y
```

Excellent! Now we should have a folder set up as a git repository with a `package.json` file. Before we install Eleventy, we’ll need a `.gitignore` file to keep us from tracking any unwanted files or folders. We’ll start with `node_modules`, so we can avoid some noise in our git history. Our build process will overwrite `dist` whenever we deploy, so we’ll also ignore that folder. Even though we don’t have a `.env` file yet, we’ll add that to the `.gitignore` so we don’t accidentally commit API keys or other secrets in future projects.

```sh
node_modules
dist
.env
```

This is a good time to include any other optional configuration files for the development experience, so add any `.editorconfig` or `.prettierrc` files, etc. that you normally use while developing.

It’s also a good time to add a `README.md` file, which we’ll be updating throughout this series as we build the starter template. For now, we’ll keep it simple and only include a title and a brief description.

```md
# Eleventy Starter

Use this starter template to create a new Eleventy project with the click of a button!
```

With all this in place, it’s a good time to make our initial commit.

```sh
git add .

git commit -m "chore: initial commit"
```

## Generating Our First Page

Now let’s install Eleventy and set up a couple of `npm` scripts to run it.

```sh
npm install --save-dev @11ty/eleventy
```

In our `package.json`, we’ll want to add a `start` script to run Eleventy in development mode and a `build` script to run our production build. We can also delete the default `test` script that our `npm init` created (we’ll get to testing later in this series when we set up our JavaScript build process).

```json
{
  "scripts": {
    "start": "eleventy --serve",
    "build": "eleventy"
  }
}
```

The `eleventy` command will build our site by taking our source files, processing them, and putting the resulting HTML files into a folder (currently the `_site` folder). Adding the `--serve` command will start a local development server, usually on port `8080`, and rebuild the site when files are changed.

With that in mind, our `start` script is what we’ll be using during development since it will rebuild the site as we make changes, and our `build` script is what we’ll use when we want to build the site for production.

Let’s go ahead and run `npm start`. We should see some output that tells us that Eleventy built our `README.md` file into `_site/README/index.html`, and we ought to see that file added to our project. If we open `http://localhost:8080/README`, we should see our README rendered as HTML. If you make some changes to `README.md` and save, Eleventy will rebuild the page, so you’ll see the updates when you reload the page.

So that’s cool, but it’s not quite what we want. For starters, the HTML that is output is missing some key structural elements, and we don’t want Eleventy to be publishing our README as part of the site. Let’s delete the `_site` folder and work on defining the project structure to suit our needs.

## Defining Our Project Structure

The ideal project structure should be easy to navigate so that newcomers can understand the project without much trouble. Let’s organize our project so that configuration and tooling happen at the root, the code for the site itself goes into `src`, and the end result gets published to `dist`.

Within `src`, we will want a couple of folders to start with:

- `pages`: this will be where we put our individual pages
- `partials`: this will be where we put layouts and reusable HTML templates

We can configure this with Eleventy by adding a config file named `.eleventy.js` at the project root.

```js
module.exports = function (eleventyConfig) {
  return {
    // configuration object for directories
    dir: {
      // Eleventy will look here for files to process
      input: 'src/pages',
      // the built files will be placed here
      output: 'dist',
      // tells Eleventy where to look for layouts/partials
      includes: '../partials',
    },
  };
};
```

Now let’s create an `index.md` file in `src/pages`.

```md
# Hello World!

This is the home page!
```

If we run `npm run build`, we should see that file get transformed into HTML and dropped into `dist/index.html`. However, it will still be invalid markup, so let’s fix that.

## Creating Our HTML Layout

Our HTML layout is going to be a shell that will surround the content from individual pages. It will be reused by different pages, so our main concern is the document structure. We’ll use Nunjucks as our templating language throughout this project, so let’s create a `layout.njk` file in the `src/partials` folder and set up our bare minimum HTML structure.

```html
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- TODO: make these dynamic -->
    <title>Eleventy Starter</title>
    <meta
      name="description"
      content="This describes the content of the page."
    />

    <!-- TODO: add link tags, other meta tags, open graph info, etc. -->
  </head>
  <body>
    <!-- TODO: make the header and footer overridable -->
    <header>
      <p>This is the header.</p>
    </header>
    <main>{% raw %}{{ content | safe }}{% endraw %}</main>
    <footer>
      <p>This is the footer.</p>
    </footer>
  </body>
</html>
```

Breaking this down, we have some boilerplate that isn’t likely to change, such as the `<!doctype html>` declaration, `html` and `body` tags, and the first two `meta` tags. Then we have our `title` and meta description, which we’ll want to make dynamic in the future (stay tuned for Part Two!). And we have our landmark elements, `header`, `main`, and `footer`.

The `{% raw %}{{ content | safe }}{% endraw %}` line in our `main` tag will be replaced by the contents of whatever page is using this layout. We can update our `index.md` to reference this layout by specifying some [front matter](https://www.11ty.dev/docs/data-frontmatter/).

```md
---
title: Home Page
description: This is the home page. It isn't very interesting right now.
layout: layout.njk
---

# Home Page

You are on the home page! Try editing this file to see things change in real time and inspect the HTML to make sure everything is valid.
```

If we rebuild the site, we should see this home page content combined with our layout HTML to build a complete page.

## Cleaning Up After Ourselves

Before we move on to making our HTML more dynamic, let’s put in some cleanup steps to make our lives easier in the future. Whenever `eleventy` builds our files and dumps them into `dist`, it will overwrite any matching files or create new ones if they don’t already exist.

This can add clutter if we’re not careful, so let’s create an npm script to delete `dist` every time we run `npm start` or `npm run build`. If we’re using macOS or Linux, we can use the `rm -rf` command to handle this, but that may not work for Windows, so we’ll install `rimraf` for cross-platform compatibility. If your preferred OS supports `rm -rf`, feel free to skip this dependency.

```sh
npm install --save-dev rimraf
```

Then, in our `package.json`, we’ll create a `clean` script that will delete `dist`, and we’ll use [“pre” scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts#pre--post-scripts) to run it before our `start` and `build` scripts.

```json
{
  "scripts": {
    "prestart": "npm run clean",
    "prebuild": "npm run clean",
    "start": "eleventy --serve",
    "build": "eleventy",
    "clean": "rimraf dist"
  }
}
```

## Boilerplate. Check.

Even if we stopped here, this would still be a useful starter template, since we wouldn’t need to run through these installation and configuration steps for a new project. Even if it only saves half an hour of work, that’s 30 minutes that can be spent building the thing rather than writing boilerplate.

Now that our project structure and basic configuration are set up, we can move on to the good stuff! Join us in Part Two, where we will make our layout HTML more dynamic, add some more pages, and get some HTML linting up and running.

{% include 'partials/article-pagination.njk' %}
