---
title: 'Eleventy Starter: Maintenance and Collaboration | Writing | Dustin Whisman'
description: This article is about handling dependency updates, maintaining code quality, and providing templates for pull requests and issues for better collaboration.
articleTitle: 'Building an Eleventy Starter Template: Maintenance and Collaboration'
layout: layout.njk
date: 2022-11-02
tags:
  - writing
  - eleventy starter template
---

# Building an Eleventy Starter Template: Maintenance and Collaboration

<p class="cmp-fine-print">
  This was originally published on the
  <a href="https://sparkbox.com/foundry">Sparkbox Foundry</a>.
  You can read
  <a href="https://sparkbox.com/foundry/eleventy_starter_repo_conclusion_teaches_maintenance_collaboration_tools">the article on the Foundry</a>
  or go to the
  <a href="https://sparkbox.com/foundry/series/building_an_eleventy_starter_template">landing page for the whole series</a>.
</p>

<p class="cmp-fine-print">
  Published:
  <time datetime="{{ page.date.toISOString() }}">
    {{ page.date.toLocaleDateString(undefined, { timeZone: 'UTC' }) }}
  </time>
</p>

In the [previous entry in this series](../eleventy-starter-pwa-support), we added Progressive Web App support to our project template. To finish, we will add some configuration and tooling that makes collaboration and maintenance easier for projects using the template.

If you just want to see the code (or use the starter template), you can find the repo at [https://github.com/dustin-jw/eleventy-starter](https://github.com/dustin-jw/eleventy-starter). If you have ideas for how to improve the template or have other features you would like to see, feel free to create GitHub issues.

Now, onto the configuration and tooling!

## Managing Dependencies

Our project relies on a fair amount of third-party dependencies in the `npm` ecosystem. This has its benefits—such as the improved tooling that makes development easier—but we also have to take on the task of keeping those dependencies up to date. We’ll want to make that as easy as possible (or else we’re unlikely to do it at all), so let’s start by setting up [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates).

### Dependabot

Dependabot is a tool for managing version updates that is integrated into GitHub. It can handle a variety of package ecosystems, including `docker`, `composer`, `npm`, and many others. All we need to get it set up is a `dependabot.yml` file, which we put in a `.github` folder in our repo.

```yaml
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
```

With just six lines of configuration, we’ve told Dependabot that we want to scan our code for `npm` dependency updates once per week. Dependabot will write pull requests for any packages that it finds that are out of date, including changelogs and release notes in the descriptions of those PRs. Here is the [first Dependabot PR](https://github.com/dustin-jw/eleventy-starter/pull/6) that was opened for this repository.

Now we’ve got a way to let us know when packages have new versions available, and it even writes the PRs for us! That’s great, but there are some drawbacks that we can improve on. When a Dependabot PR is merged, all other open Dependabot PRs are automatically rebased. This means that you need to wait for Dependabot to perform the rebase operation, then wait for any other CI checks to pass, then rinse and repeat for however many PRs are opened. This time adds up and quickly becomes a nuisance, so let’s see what we can do to improve that.

### Grouping Dependency Updates

At the time of writing, Dependabot does not have a way to group dependency updates together into single PRs. If we want to tackle all of our outdated packages at once, we need to improvise a little. We can run `npm outdated` to list the packages that can be updated. The output looks a little something like this:

```sh
Package      Current   Wanted   Latest  Location                  Depended by
@babel/core   7.19.3   7.19.6   7.19.6  node_modules/@babel/core  eleventy-starter
@types/jest   29.1.2   29.2.0   29.2.0  node_modules/@types/jest  eleventy-starter
babel-jest    29.1.2   29.2.1   29.2.1  node_modules/babel-jest   eleventy-starter
esbuild      0.15.10  0.15.12  0.15.12  node_modules/esbuild      eleventy-starter
stylelint    14.13.0  14.14.0  14.14.0  node_modules/stylelint    eleventy-starter
```

From that list, we can go into `package.json`, update the version numbers, run `npm install`, and then commit those changes. That is still a bit too manual though, so let’s see how we can improve the process from here.

We can use a package called [`npm-check-updates`](https://github.com/raineorshine/npm-check-updates) to handle the majority of this work.

```sh
npm install --save-dev npm-check-updates
```

This tool essentially does what `npm outdated` does, except we can tell it to overwrite our `package.json` with the updated version numbers that it finds. It has other, more advanced options, but this should be good enough for what we need. Let’s add a couple of `npm` scripts so we can make the update process as smooth as possible.

```json
"scripts": {
  "update-deps": "ncu -u",
  "postupdate-deps" "npm install"
}
```

The `update-deps` script will update `package.json`, and we’re using a `post` script to automatically run `npm install` once that finishes to get our `package-lock.json` up to date as well. Now when we need to update some packages (like when Dependabot creates PRs), all we need to do is run `npm run update-deps` then commit the results.

Well, that’s assuming that our linters and tests still pass. Speaking of which…

## Continuous Integration Checks (CI Checks)

We want to have a high degree of confidence that any code that we add is going to be high quality. That’s why we set up linting and testing in the earlier parts of this series. However, if nobody runs those scripts, they aren’t going to be effective. That’s why we’ll be using GitHub Actions to set up some CI checks that run the linting and testing scripts that we’ve set up.

To set up a GitHub Action to run our CI checks, we’ll add a file to `.github/workflows` and we’ll call it `lint-and-test.yml`.

```yaml
name: Lint and Test

on: [pull_request]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16.x'
      - name: install npm dependencies
        run: npm ci
      - name: run linters
        run: npm run lint
      - name: run tests
        run: npm run test
```

In this configuration file, we’ve done the following:

- Named the action
- Set this workflow to run on all pull requests
- Told the action to run on the latest version of Ubuntu, using Node v16
- Defined the steps to perform (installing dependencies, then running our linting and testing scripts)

If packages can’t be installed or if either of the `lint` or `test` scripts fail, the workflow will fail, which will be visible on the PR. If everything works and there are no errors, the workflow will succeed and let reviewers know that the code can at least pass the linting and testing bar.

## Improving Collaboration with PR and Issue Templates

When you’re working with other people, it helps to use consistent formats for communications such as PR descriptions and Issues. With a PR template, you can make it easier for developers to write good descriptions without much effort. Let’s add a `PULL_REQUEST_TEMPLATE.md` file to our `.github` folder.

```md
### Description

<!-- Add description of work done here -->

### Spec

<!-- Include links to relevant designs and specifications -->

Designs: [Designs](DESIGN_URL)
Requirements: [Issue/Ticket](LINK_TO_ISSUE)

### Validation

<!-- Delete anything irrelevant to this PR -->

- [ ] Visual elements match designs (or look reasonably good if no designs provided)
- [ ] Linters still pass
- [ ] Tests still pass
- [ ] New tests were added or updated, and they pass
- [ ] Copy was proofread
- [ ] Documentation was added to clarify anything new or unusual
- [ ] Changes were browser tested, including functionality, accessibility, responsiveness, and design

#### To Validate

<!-- Add steps a reviewer should follow to validate your changes -->

1. Make sure all PR Checks have passed
2. Pull down this branch
3. Run `npm start`
<!-- Add additional validation steps here -->
```

We’ve set up some useful sections for developers to fill in with their details. Of note, we use comments to prompt PR authors to write good descriptions, delete irrelevant information, and fill in validation steps. We also make it easy to paste in links to specifications, such as a Figma link, a Jira card, or a GitHub issue.

With this in place, any PR will start with this description filled in. We can do the same with Issue templates, and we can categorize them based on GitHub’s default labels. Now let’s add templates for bug reports and feature requests in a `.github/ISSUE_TEMPLATE` folder. For feature requests, we can add a `feature-request.md` file like this.

```md
---
name: 'Feature Request'
about: 'Suggest an idea or propose a new feature for the project.'
title: '[Feature] '
labels: 'enhancement'
assignees: ''
---

# Feature Request

## Description

<!--
Clearly and concisely describe the feature you are proposing. Is it related to a
problem you're having or a common frustration?

Describe the solution you would like to see.

Describe any alternatives that you've considered, if applicable.

Add any additional context that may be helpful for making your feature request a
reality!
-->
```

That section between `---` markers defines metadata about the Feature Request that is shown in GitHub’s UI when creating a new issue. The `labels` field will give the issue a default label, which will help distinguish it from other types of issues. Feature Requests can be fairly open ended, so we’ll leave the Description blank except for a comment that prompts the issue creator to write constructive suggestions.

Our bug report template has a more narrow purpose, so it will have more detail in the body. Let’s add a `bug-report.md` file like this.

```md
---
name: 'Bug Report'
about: 'Report issues to help improve the project.'
title: '[Bug] '
labels: 'bug'
assignees: ''
---

# Bug Report

## Description

<!-- Clearly and concisely describe the bug -->

<!-- Is this a regression? If so, what was the last version where this bug was not present? -->

## To Reproduce

<!-- Include steps to reproduce the bug
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error -->

## Expected Behavior

<!-- What was supposed to happen? -->

## Helpful Media (logs, screenshots, videos, etc.)

<!-- Include any logs, screenshots, videos, etc. to help explain the problem -->

## Environment

<!-- Fill out each of these bullets, or delete them if not applicable -->

- OS:
- Node version:
- npm version
- Browser name and version:

## Additional Context

<!-- Is there anything else that might help fix the problem? -->
```

The goal of this template is to prompt users and collaborators to provide as much detail as possible to help with fixing a bug, which is why there are so many sections and comments. Not everyone is going to fill out every section or have the vocabulary to describe the bug in detail, though, so be prepared to meet bug reporters where they’re at (and don’t be a jerk about it).

With these templates in place, you can see them show up as options on the [new issue page](https://github.com/dustin-jw/eleventy-starter/issues/new/choose). Note how the descriptions we set in the templates show up as hint text for each option.

<img src="/images/eleventy-series/issue-prompts.png" alt="Screenshot showing hint text previewing under each option." class="cmp-article__image">

To see how the Bug Report template looks when fully filled out, you can see [this issue](https://github.com/dustin-jw/eleventy-starter/issues/21), created specifically for this article and definitely not as an oversight when building the project.

## The End of the Start-er Template

Look how far we’ve come! We started with nothing, and now we have a starter template with all this great stuff:

- A project file structure that’s easy to navigate
- Simple HTML templates that makes adding new pages easy
- SCSS support, including linting
- JavaScript _and_ TypeScript support, including linting and testing
- Accessibility checks that run on our production-ready site
- Legacy JS bundles for the older browsers still out in the wild
- Progressive Web App support
- Tooling to make maintenance and collaboration easier

That’s a wrap on this series, but the project will live on! If you have ideas for how to make this starter template even more robust, please [create issues on the repo](https://github.com/dustin-jw/eleventy-starter/issues), or [fork it](https://github.com/dustin-jw/eleventy-starter/fork) and make tweaks to suit your own project needs.
