---
title: "Eleventy Starter: Project Setup | Writing | Dustin Whisman"
description: This article covers the basics of setting up an Eleventy project's file structure and basic configuration.
articleTitle: "Building an Eleventy Starter Template: Project Setup and Configuration"
layout: layout.njk
date: 2022-04-06
tags: writing
---

# Building an Eleventy Starter Template: Project Setup and Configuration

<p>
  Published:
  <time datetime="{{ page.date.toISOString() }}">
    {{ page.date.toLocaleDateString(undefined, { timeZone: 'UTC' }) }}
  </time>
</p>

In 2022, I wrote a series of articles for [Sparkbox's
Foundry](https://sparkbox.com/foundry) about how to build a starter template for
Eleventy. The real goal of the series was to cover all of the architectural
decisions that you need to make when starting a project, like choosing your
build tools, setting up testing and linting, and supporting as many browsers as
possible without putting too much burden on developers.

I chose Eleventy for this because I like working with it and because it doesn't
give you a whole lot out of the box, as opposed to something like Next.js or
Astro, where there's a lot more support for bundling JS and such.

This article covers the basics of setting up the project's file structure and
basic configuration. You can read [the article on the
Foundry](https://sparkbox.com/foundry/setting_up_my_project_to_build_a_github_starter_template_and_create_HTML_page)
or go to the [landing page for the whole
series](https://sparkbox.com/foundry/series/building_an_eleventy_starter_template).
