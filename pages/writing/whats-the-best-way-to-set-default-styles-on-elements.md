---
title: "What's the best way to set default styles on elements? - Writing - Dustin Whisman"
description: "A look at an issue with default styles and some ways to fix it."
articleTitle: "What's the best way to set default styles on elements?"
layout: default
date: 2023-11-02T00:00:00.000Z
tags:
  - writing
---

# What's the best way to set default styles on elements?

{% include 'partials/published-date.njk' %}

I ran into this issue recently on a project where the design system’s default styles for common elements had selectors like `h1:not([class])`. In this case, as long as an `h1` element didn’t have a `class` attribute, it would get the default styles.

Some elements had more complex styles by default, like an `h2` would get some typical font family, size, and weight styles, but it would also get a fancy partial underline using the `::after` pseudo element. This made it really obvious when those default styles were not applied, and they sure weren’t for us.

## The problem

We were using WordPress’ Gutenberg editor for content, which meant that any `h2` element added to a page ended up with markup like this:

```html
<h2 class="wp-block-heading">Heading Level 2</h2>
```

The design system already had a workaround with companion classes that existed to set the same styles, like `.cmp-heading-2`. This was meant for cases where you wanted to set utility classes but didn’t want to wipe out all of the other styles, so any of these would work for what you wanted:

```html
<h2>Default Heading</h2>
<h2 class="cmp-heading-2 util-margin-top-sm">Heading with margin</h2>
<h2 class="wp-block-heading cmp-heading-2">WordPress-generated heading</h2>
```

This all works as designed and makes sense from a developer’s point of view. It’s trivial in code to repeat styles for another selector. That’s as simple as writing `h2:not([class]), .cmp-heading-2`. But for a content editor who is not a developer? They’re going to have some questions about why they need to copy and paste “cmp-heading-2” into the advanced settings on every single Heading Level 2 that they add when writing content.

## Some solutions

So what are our options? Well, we could say tough luck to the person writing content for the site and tell them to add that class everywhere, but make sure not to forget any or the site will look inconsistent. Not a great option.

We could try to hack WordPress’ behavior to avoid adding those class names in the first place, but that’s a whole can of worms and could easily break after a WordPress update. Also not a great option.

We could update the design system, getting rid of those `:not([class])` parts, but that’s a pretty big breaking change, and there were multiple other sites using that design system that wouldn’t be prepared for the default styles to suddenly change with a new release. It could be done, but we’d have to be really careful about versioning or working with the other site owners on updating content to avoid visual bugs.

We could update the design system with vendor-specific styles, tacking on those `.wp-*` classes to the default selectors so that `h2:not([class])` and `h2.wp-block-heading` applied the same styles. This requires knowing which WordPress class names get automatically set on which elements, which is subject to change, but is at least a non-breaking change and would benefit other WordPress sites using the design system.

We ended up recommending the latter option, but for the short term (the period before design system changes are released) we wrote some JavaScript to remove the default class attributes that were causing the most problems. Not ideal, but it’ll do in a pinch.

## Why do this at all?

Let’s examine the reasons why we might want to use those `:not([class])` selectors in the first place. One advantage is that if we want our element to be styled differently, we don’t need to reset any properties of the default styles. Just setting a `class` ensures that they don’t even apply in the first place. For our `h2` element’s somewhat involved `::after` styles, this makes sense.

This also allows you to create generic class selectors like `.cmp-heading` that don’t need to know anything about the default class-less styles to reset them. Both are good reasons to use this approach. However, we have the issue I described earlier, and it just feels a little clunky to have all these duplicate selectors to apply the same styles.

## There’s gotta be a better way!

To avoid issues like this going forward, I would take a look at those default styles and see just how “default” they actually are. If they’re meant to be used consistently across the board, or they’re simple enough that resetting them elsewhere isn’t a hassle, it’s probably fine to drop the `:not([class])` part of the selector. In instances where you want to wipe out the defaults, [`all: revert`](https://developer.mozilla.org/en-US/docs/Web/CSS/all) is an option, although it’s probably overkill for most cases.

Alternatively, maybe the way to opt out of the default styles should be more explicit. `:not([class])` is incredibly broad, but something like `:not(.util-reset-defaults)` would solve the same problems without being as prone to the issue I described earlier. In this case, our content editor in WordPress would only need to set “util-reset-defaults” for non-default instances.

I’d probably stick with the former approach for sites where I have control over content and styling, but I’d probably do the latter on design systems or CMS projects. As always, it depends.

{% include 'partials/article-pagination.njk' %}
