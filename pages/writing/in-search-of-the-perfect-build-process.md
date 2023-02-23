---
title: 'In Search of the Perfect Build Process | Writing | Dustin Whisman'
description: In which I cover all the changes I've made to the build process for this site, attempting to make it better, faster, stronger.
articleTitle: In Search of the Perfect Build Process
layout: default
date: 2023-01-29
tags:
  - writing
---

# In Search of the Perfect Build Process

{% include 'partials/published-date.njk' %}

If you've taken the time to read my [series on creating an Eleventy starter template](/writing/eleventy-starter-template/), you may have the (correct) impression that I think about build processes quite a bit. One of the goals of that project and the resulting [starter template](https://github.com/dustin-jw/eleventy-starter) was to have something I could use to quickly get a new site up and running with very little effort.

I think I achieved that goal reasonably well, considering that I used it to create this very site–a quick look back at the commit history shows that my first commit was on a Saturday morning, and by Sunday afternoon, the first version of the site was live. However, I also built that starter template to cover a wide range of scenarios that might not apply to every project, including this site, so I'm going to walk through some of the changes I've made recently to clean up the build process.

For fun, I'll go through it in the same order as the Eleventy starter series, starting with…

## Project Setup and Configuration

Compared to the starter template, the folder structure is basically the same inside `src`, with the exception of changing the `scss` folder to `css` and removing the `js` folder (more on that later). At the root level, we start to see more changes, which I'll leave without comment here as a hint of what I've changed. I added some new files and folders:

- `.env.example`
- `.prettierignore`
- `.prettierrc.json`
- `cypress.config.js`
- `postcss.config.js`
- `.husky` (folder)
- `cypress` (folder)

I also have some files that went away (RIP):

- `.babelrc`
- `.pa11yci.json`
- `jest.config.js`
- `webpack.config.js`
- `tsconfig.json`

More on what these changes mean later.

## HTML

Not much has changed in terms of how HTML is structured. The layout file is essentially unchanged, except for site specifics like the header and footer. I did add a couple of "pages" of note, though, which are the RSS feed and the sitemap. One thing that I didn't go into much depth on in the Eleventy series was how permalinks can be used to do cool stuff. I also didn't really cover collections at all, but combining the two is essential for generating RSS feeds and sitemaps on build. I'll include the `sitemap.njk` file here, since it's shorter and demonstrates the concept pretty well.

```html
---
permalink: /sitemap.xml
eleventyExcludeFromCollections: true
---

<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  {% raw %}{% for page in collections.all %}
  <url>
    <loc>{{ processEnv.BASE_URL }}{{ page.url | url }}</loc>
    <lastmod>{{ page.date.toISOString() }}</lastmod>
  </url>
  {% endfor %}{% endraw %}
</urlset>
```

The `permalink` basically ensures that we end up with a route at `/sitemap.xml` instead of `/sitemap/index.html`, which is what it would be by default. The `eleventyExcludeFromCollections` field ensures that this page doesn't get included in any collections, keeping them from showing up if you loop over `collections.all`. I have that set for a few other "pages" that aren't real pages as well.

### HTML Linting

In the starter template, I used `pa11y-ci` to process the built HTML files to check for accessibility and markup issues. However, on a completely different project where I had the same thing set up, I started seeing inconsistent results. If you ran `pa11y-ci` against a live site or `localhost`, you would see completely different issues reported when compared to running against HTML files.

This might just be a gap in my understanding, but the fact that you can run `pa11y-ci` against HTML files without error makes it seem like that's a valid use case. I'm a little confused about how this is supposed to work in CI, like are you supposed to spin up a local file server in CI, then run the tests and shut down the server? That's a little convoluted for my taste, and considering the lack of clear documentation, I decided to drop `pa11y-ci` completely.

As an alternative, I set up a [Cypress](https://www.cypress.io/) test suite to run [`axe-core`](https://github.com/dequelabs/axe-core) against every page in the aforementioned sitemap. This runs on any push to `main`, and it looks at the production version of the site, which makes it more of a monitoring tool than something that should block a pull request before merging. So far, it's been reliable and already caught an issue with duplicate `h1` tags that I was able to fix pretty quickly. Is it the fastest feedback loop? Not really, but it's good enough for now.

I will say that I have my eye on [Playwright](https://playwright.dev/) as an alternative. I ran into an issue with Cypress on a different project, where you can't ask Cypress to tab through a page or component, which is a pretty big deal-breaker for accessibility testing. This [long-standing issue](https://github.com/cypress-io/cypress/issues/299) would seem to indicate that support for tab interactions isn't coming any time soon, so if Playwright doesn't have the same issue, I might reach for it first in the future.

## CSS

In the starter template, I used Sass for all the styling, and I had a few helper functions set up for a fluid size scale and font-families. Other than that, though, there wasn't a pressing reason to keep using Sass over vanilla CSS. I started running into friction when I wanted to try out the `hwb` format for colors, and it started to feel like in the long run, `sass` might be more of an obstacle than a helpful tool.

I don't know if you've noticed, but CSS has gotten pretty good over the last few years. We have container queries, the `:has` selector, new color formats, cascade layers, and native nesting all either already supported or coming very soon. I don't know that `sass` as a library will be able to keep up. If I want to use `oklch` in the not-too-distant future, and I want to use CSS custom properties to set the hue values, how is Sass going to support that? Will I need to create custom functions to bypass `sass` processing `oklch` values?

Long story short, I switched to PostCSS for bare-minimum processing. I'm using `postcss-import` so I can continue to organize my CSS into partials and `cssnano` for minification, and that's it. My dev and build scripts now look like this:

```json
"css:dev": "postcss src/css/*.css --dir dist --watch",
"css:build": "postcss src/css/*.css --dir dist --no-map",
```

And my config looks like this, the most notable part of which is that I'm basing the decision to minify the output on whether there's a source map or not.

```js
module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: {
    'postcss-import': { root: ctx.file.dirname },
    cssnano: !ctx.options.map,
  },
});
```

I started to look into [`lightningcss`](https://github.com/parcel-bundler/lightningcss) as a replacement as well, but there were a few issues with it that made it a non-starter for me.

1. There's no `--watch` flag for their CLI
2. It would throw errors whenever it tried to write to `dist` if that folder didn't already exist
3. The path to the source map was hard-coded in such a way that it would return a 404 in my development environment
4. There's no inline source map option

All of this meant more dependencies and configuration to fill in the gaps, and I don't want that. I want set-it-and-forget-it and it just works. Maybe if those issues get addressed, I'll check it out again, but for me, it's just not ready for prime time.

### CSS Linting

One side effect of switching to PostCSS was that my `stylelint` rules for Sass were no longer needed. I swapped out `stylelint-config-standard-scss` for `stylelint-config-standard`, and I also added `stylelint-config-prettier`, for reasons that will be clear soon. I wish `stylelint` baked in the recommended rules instead of requiring a separate dependency, but such is life.

## JavaScript

So here's the thing. I don't have any client-side JavaScript on my site, and I don't plan to add any until I absolutely need it. As such, I deleted virtually all of the build process relating to client-side JS. The `src/js` folder? Gone. The `js:dev` and `js:build` scripts? Gone. `esbuild` and `jest`? Gone.

Before moving on, a note about `jest`. Before I got rid of it, I replaced it with [`vitest`](https://vitest.dev/) and I don't think I'll ever go back to `jest` for new projects. The API is extremely similar, making migration relatively easy, but the biggest thing for me is ESM module support. I don't know how `jest` has been around for so long without adding support for ESM modules, but it is so nice to not _need_ Babel just to be able to write tests the same way you write the rest of your JS. `vitest` is also just much faster and supports concurrent tests, so if it does anything else like make mocking easier, that's just icing on the cake.

### JavaScript Linting

So I don't have any client-side JS, but I do still have back-end JS (or rather build-time JS) along with configuration files and Cypress tests, so I still need some JS linting in place. I've been wanting to reduce the total number of dependencies, though, so I decided to remove the `eslint-config-airbnb` rules.

I did this for a couple of reasons.

1. As someone who cares about affordable housing, it feels weird to support Airbnb (even in a tangential way like this)
2. I don't run afoul of their rules often, but when I do, it's usually for good reason

The built-in `eslint:recommended` rules should be enough to catch any grievous errors, and I added `eslint-config-prettier` to turn off all the rules related to formatting. On a project with other, more junior team members, I might want stricter rules, but since this is for my personal site and I trust my abilities, I'm comfortable with this setup.

## Legacy JS Builds and TypeScript Support

The legacy builds also went away since I have no client-side JS. This removed a _lot_ of dependencies, including everything related to Webpack and Babel. I also removed the TypeScript dependencies and `tsconfig.json`, since all of that would have been in support of client-side JS.

I also have mixed feelings about TypeScript. I appreciate being reminded when things could be undefined and I could use a little more error handling, but that's kind of the only time that it feels like TypeScript is helping me rather than yelling at me about valid code. I've been using TypeScript on other projects, and maybe I haven't been using it to its full potential, but it feels more like a burden than a necessity to me.

Maybe TypeScript makes more sense to people coming from different languages, like C# or whatever, but JavaScript is such a dynamic language that imposing type safety on it feels like working against the grain of the platform. It also adds more tooling, more dependencies, and more time spent reading dense, often unhelpful error messages. At this moment in time, I think I'd only reach for TypeScript if I was on a big project with lots of other developers with varying levels of experience. For personal, low-stakes projects, I'm perfectly happy with plain-old JavaScript.

## Progressive Web App Support

I don't think I changed much of anything about PWA support. I had to create the icons I wanted at the start, but after that, I haven't had to do much. I added a variable and check for `IGNORED_PROTOCOLS` since I found that Chrome extensions would cause errors with the service worker, but that's about it. Lasting success on this front!

## Maintenance and Collaboration

I've already alluded to it a few times, but I added [`prettier`](https://prettier.io/) as well as the CSS and JS linting dependencies that go along with it. I also set up a pre-commit hook using [`lint-staged`](https://github.com/okonet/lint-staged) and [`husky`](https://typicode.github.io/husky) to make sure everything is formatted before getting committed.

This isn't super necessary for a project like this, but I wanted to have a working example of this setup that I could reference for team projects. I've reviewed enough PRs to not want to leave feedback about missing semi-colons or tab alignment issues. It's just a distraction and a chore that I'd rather let a machine do automatically.

Speaking of chores I'd rather let machines do, I removed my Dependabot config, replacing it with a GitHub action that will check for _all_ packages that have updates available at once and create a PR for them. For a while, I've been using Dependabot PRs as a prompt to manually update packages, since the process of merging individual PRs one by one is untenable, especially if you have CI checks on every PR that take longer than a minute.

The manual process I'd been following was this:

1. Checkout a new branch
2. Run `npm run update-deps`, which effectively ran `npx npm-check-updates -u && npm install`
3. Commit the changes
4. Push the branch and create a PR
5. Wait for the CI checks to finish and the deploy preview to build
6. Check the deploy preview for obvious issues
7. Merge the PR
8. Delete the PR branch

It felt like at least steps 1-4 could be automated, so I did just that in a new GitHub Action called `check-for-udpates`. It makes use of the GitHub CLI, and it required generating a token and adding some secrets to the repo, but was otherwise a matter of writing a shell script to do the tasks I just listed.

```sh
# this isn't the actual flow, but it's pretty close
# check for updates, updating package.json in the process
# write the output from the command into a text file to be read later
npx npm-check-updates -u > updates.txt && git diff package.json | grep '^[+-]'

# if the diff has any line changes (i.e. package.json was updated)
if [ $? -eq 0 ]; then
  git checkout -b chore--update-deps-$(date +'%Y-%m-%d')
  npm install
  git add package.json package-lock.json
  git commit -m "chore: update npm dependencies"
  git push --set-upstream origin chore--update-deps-$(date +'%Y-%m-%d')

  # read the output of the npm-check-updates command
  # we only want the list of packages that changed
  updates=$(sed '1,2d;$d' updates.txt)
  # build the PR's description
  echo -e "### Description\n\nThis updates the following npm packages to their latest versions.\n\n$updates\n\n#### To Validate\n\n1. Make sure all PR Checks have passed\n2. Check the deploy preview to make sure nothing is obviously broken\n3. Check the changelogs of affected packages to make sure there are no breaking changes to account for" > pr-body.txt

  # create the PR
  gh pr create --title "chore: update npm dependencies" --body "$(cat pr-body.txt)"
fi
```

I scheduled this job to run every Saturday at 6 am so that I can review the PR and merge it or manually intervene if there's an issue, circumventing all of that tedious work. Here's an example of what the PR description looks like for one of these PRs.

```md
### Description

This updates the following npm packages to their latest versions.

axe-core ^4.6.2 → ^4.6.3
cypress ^12.3.0 → ^12.4.1
npm-check-updates ^16.6.2 → ^16.6.3

#### To Validate

1. Make sure all PR Checks have passed
2. Check the deploy preview to make sure nothing is obviously broken
3. Check the changelogs of affected packages to make sure there are no breaking changes to account for
```

## Conclusion

So have I achieved the perfect build? Probably not, but it is a lot more tailored to this site than it was at the beginning. I'm down to 17 development dependencies from a starting point of 29, so I'd call that a win for maintainability. I cleared out a lot of potential obstacles and clutter that I wasn't using, and I got to play around with some new tools.

I'll always be tweaking and experimenting, and as new tools come out or improve over time, I'm sure I'll be swapping pieces in and out. I'll probably carry a lot of these changes over to the starter template, which has been admittedly a little bit abandoned as I've been busy with other things, and as Eleventy 2.0 comes out (it's in beta at the time of writing this), I'm sure I'll be able to make a lot of improvements to that template. [Vite](https://vitejs.dev/) instead of Webpack, perhaps?
