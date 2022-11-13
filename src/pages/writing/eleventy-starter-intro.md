---
title: "Eleventy Starter: Introduction | Writing | Dustin Whisman"
description: This introduces the series of articles I wrote for Sparkbox's Foundry about how to build an Eleventy Starter Template.
articleTitle: Setting up Future Projects for Success with Template Repositories
layout: layout.njk
date: 2022-03-23
tags: writing
---

# Setting up Future Projects for Success with Template Repositories

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

This article introduces the series, giving a more detailed thesis statement for
the whole project. You can read [the article on the
Foundry](https://sparkbox.com/foundry/how_to_build_github_starter_templates_for_Eleventy_to_make_your_projects_easier)
or go to the [landing page for the whole
series](https://sparkbox.com/foundry/series/building_an_eleventy_starter_template).
