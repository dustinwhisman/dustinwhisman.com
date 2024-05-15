---
title: "Dependabot is useful now - Writing - Dustin Whisman"
description: "Now that grouped updates are supported, it makes sense to use Dependabot for keeping project dependencies up to date."
articleTitle: "Dependabot is useful now"
layout: default
date: 2023-11-08T00:00:00.000Z
tags:
  - writing
---

# Dependabot is useful now

{% include 'partials/published-date.njk' %}

I’ve used [Dependabot](https://docs.github.com/en/code-security/dependabot) on and off for the past few years to handle keeping mostly npm dependencies up-to-date on various projects. I say “on and off” because some limitations made it really annoying to work with until recently.

## So much tedium

The point of Dependabot is to have something else take care of keeping dependencies updated while you work on _the thing_, allowing you to prioritize important work over tedious maintenance. The way it worked when I was introduced to it was that it would scan your repository on a regular schedule and create PRs to install newer versions of dependencies. Then a reviewer could take a look, make sure the changes didn’t introduce any breaking changes, approve, and merge the PR. Rinse and repeat for however many PRs Dependabot created.

The problem with this approach is that Dependabot would create a PR for every single dependency that needed updating. If you have a long CI process that needs to complete before merging PRs, it only takes a few Dependabot PRs to turn your maintenance process into a nightmare. Even without a long CI process, reviewing each PR individually is a pain, and that assumes that you’re actually doing due diligence and not just rubber stamping them. There are also scenarios where multiple dependencies _need_ to be updated at the same time, so the separate PR workflow breaks down even further.

Eventually, I started using Dependabot PRs as a signal to open a separate PR that updated all dependencies at once because that was actually faster. [`npm-check-updates`](https://github.com/raineorshine/npm-check-updates) is a handy little package that I used for a while as a Dependabot alternative. However, Dependabot now supports grouped updates, and it actually makes sense to use it now.

## Grouping updates together

You can now set a `groups` option in your `dependabot.yml` file to decide how much or how little you want to group your dependency updates. If you have a low-risk project where you’re fine with updating every dependency at once, then you can set up a super simple config like so:

```yaml
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
    groups:
      dependencies:
        patterns:
          - '*'
```

I’d only recommend this for side projects or solo projects that are low-stakes. For cases where you’re working on a team or there’s more risk involved if breaking changes end up in production, then I’d recommend grouping updates based on the following criteria:

- Minor/patch version updates for development dependencies
- Major version updates for development dependencies
- Minor/patch version updates for production dependencies
- Major version updates for production dependencies

The development dependencies should be low risk, since, if used correctly, they are only used during development and not for anything that makes its way into production. These are your linters, your test runners, your code formatters, etc. Production dependencies require more scrutiny, since they’ll end up running in production and affecting real users if they break. Separating out the major version updates from the minor and patch version updates helps signify that breaking changes are possible and need to be tested more thoroughly.

If you want to configure groups this way, here’s how you would do that:

```yaml
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
    groups:
      dev-dependencies:
        dependency-type: 'development'
        update-types:
          - 'minor'
          - 'patch'
      major-dev-dependencies:
        dependency-type: 'development'
        update-types:
          - 'major'
      production-dependencies:
        dependency-type: 'production'
        update-types:
          - 'minor'
          - 'patch'
      major-production-dependencies:
        dependency-type: 'production'
        update-types:
          - 'major'
```

This will open a maximum of 4 PRs at a time, but if you update regularly enough, it’s unlikely that you’ll hit that limit.

If this doesn’t work for you, take a look at the [configuration options for grouped updates](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#groups). They’re pretty flexible, so it should be possible to get as granular as you need.

{% include 'partials/article-pagination.njk' %}
