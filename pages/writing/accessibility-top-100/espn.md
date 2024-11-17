---
title: "How accessible is ESPN? - Writing - Dustin Whisman"
description: "How accessible is ESPN? This is part 11 of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "How accessible is ESPN?"
layout: default
date: 2024-11-17T00:00:00.000Z
tags:
  - writing
  - accessibility top 100
---

# How accessible is ESPN?

_This is part 11 of a [series](/writing/accessibility-top-100/) evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at ESPN. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}

## What I tested

With it being a Sunday during football season, I decided to focus on NFL-centric pages, so in addition to the [home page](https://www.espn.com/), I also tested the [NFL scoreboard page](https://www.espn.com/nfl/scoreboard) and the [overview page](https://www.espn.com/nfl/team/_/name/den/denver-broncos) for my local team, the Denver Broncos.

<figure>
	<picture>
		<source srcset="/images/accessibility-top-100/espn/desktop-h.png" media="(min-width: 50rem)">
		<img src="/images/accessibility-top-100/espn/desktop-v.png" alt="A composition of screenshots from the desktop version of espn.com, showing the home page, the NFL scoreboard page, and the Denver Broncos overview page." class="cmp-article__image">
	</picture>
	<figcaption>These are the pages that were tested on desktop.</figcaption>
</figure>

<figure>
	<img src="/images/accessibility-top-100/espn/mobile.png" alt="A composition of screenshots from espn.com on mobile, showing the home page, the NFL scoreboard page, and the Denver Broncos overview page." class="cmp-article__image">
	<figcaption>These were the pages tested on mobile.</figcaption>
</figure>


I tested ESPN on November 17th, 2024.

## Testing the home page

### Automated scans

Color contrast issues are widespread, which is a bad sign, since that’s one of the easiest things to test for. The box scores at the top of the home page show the team’s record in light gray on a white background, at least until the game starts. On scoreboards for games that have finished, the loser gets light gray text on a white background. There are timestamps next to articles indicating when they were published (I assume) that are similarly light gray on white. Also, buttons for fantasy basketball and hockey use white text on bright orange or blue backgrounds. Those are just the ones I cared to note—color contrast issues are all over the place.

There are a significant number of images that do not have `alt` attributes, empty or not. Some of them are the little logos used in box scores, some are featured images for articles, and others are for commonly used icons and logos, like the NFL logo. While a good number of them could be considered decorative, they don’t have empty `alt` attributes to mark them as such. Using the selector `img[alt]:not([alt=""])`, I found only 8 images (out of over 400) that had anything resembling useful alternative text.

The lack of alt text becomes extra important when the images are used in links, such as three links in the main navigation of the site that don’t have any accessible names because they use logos with no text alternative. Other unnamed links happen in the sidebar, where featured images are wrapped in links, and so are the titles of the articles being linked to. In this case, I’d either remove the link from the image and use some CSS to expand the click target of the title’s link, or I would remove the image link from the tab order using `tabindex="-1"`, since it is redundant. Either option would remove an unnecessary tab stop for keyboard users, and the link would always have an accessible name.

In a few places, carousels are implemented by what appears to be [slick](https://github.com/kenwheeler/slick), a jQuery carousel library, that incorrectly uses [`role="listbox"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role) for the carousel container. This library has [known accessibility issues](https://github.com/kenwheeler/slick/issues/3268) and hasn’t had a release since 2017, so let this serve as a reminder to evaluate third party code to make sure it’s accessible and well maintained before you bolt it onto your own projects. On mobile, this same sort of carousel is implemented as a `div` with horizontal scrolling, which would honestly be better than the desktop version. However, it is not focusable and can’t be scrolled by keyboard-only users.

Each of the box scores at the top of page is given `tabindex="0"` even though they are `div` elements without any explicit roles. Not only does this add more tab stops for keyboard users, but it also fails to adequately describe what is being focused for screen reader users.

Moving on to even more basic issues, the page’s `html` element does not have a `lang` attribute, and many elements are not contained by landmark regions. There are fewer ARIA issues than other websites I’ve evaluated, which could either mean that they are using it correctly most of the time, or they’re barely using ARIA at all. My bet is on the latter, but that’s okay, since no ARIA is usually better than misused ARIA.

Zooming and scaling appears to be disabled, based on the `viewport` meta tag, but I was able to zoom in on both desktop and mobile versions of the site. This may be a result of emulating mobile browsers on a desktop. When I visited the site on my phone, I could not zoom in at all.

### Manual testing

The keyboard-only experience is atrocious. The first three tab stops aren’t links and have no focus indicators, so it’s anyone’s guess as to what they’re for. From there, each box score gets two tab stops, one of which has no focus indicator, and features that are available on hover (links appear for buying tickets or viewing whatever “Gamecast” is) cannot be accessed via keyboard. The tab order in the main navigation is bizarre, going from left to right to a certain point, then skipping to the end and going right to left. After that, there are effectively no visual focus indicators for the rest of the page.

When zooming in to 200% on desktop, everything resizes and reflows the way you would hope, but the keyboard-only experience degrades even further, as the hamburger menu for the main navigation no longer has any focus indicators. At 400%, the same keyboard issues remain, but as long as you can see the page and use a mouse, everything scales up accordingly. While attempting to scale only text, I discovered that their font sizes are set in `px` units, when they should be set using relative units like `rem` or `em`.

## Testing the NFL scoreboard page

### Automated scans

Remember those logos that either had no `alt` text or were marked as decorative? Well, they’re used in links for every team, meaning that there are dozens of unnamed links on the page. Similar to the featured images from the home page, these are adjacent to other links to the same destinations, so a little CSS trickery or `tabindex="-1"` would work equally well here.

The scoreboard defaults to showing the current week’s scores, but you can navigate to past or future weeks. For the NFL, there are 23 weeks, and instead of allowing horizontal scrolling, there are buttons to programmatically scroll through the weeks. Too bad the buttons don’t have accessible names and you can’t tab past the currently visible weeks to get to the hidden ones.

This page uses a different main navigation than the home page, despite seeming very similar, and for some reason, each link has `aria-selected` attributes that are either “true” or “false”. I have no idea why. That’s not a thing for links.

There are two elements on the page that have the “main” role, one of which is nested in the other. There’s no reason to do this, and generally speaking, there should only be one `main` element per page.

On mobile, there are some malformed lists used in the secondary navigation, where `li` elements are direct children of `div` elements. It seems like a mistake happened somewhere in the process where `div` elements were accidentally added as wrappers, but it weirdly only applies to some list items, not all of them.

### Manual testing

The keyboard accessibility situation is somewhat better on this page, as at least most interactive elements have visible focus indicators. However, there are hundreds of tab stops, most of which happen before getting to the main content of the page. Since there are no visible skip links to speak of, this is incredibly tedious.

There’s an auto-playing video (on mute, at least) in the sidebar, and while it’s easy enough to pause it with a mouse, it is so deep in the tab order that it’s basically impossible to tab to it quickly to pause the distraction using only the keyboard.

The hamburger menu at least works when zooming in to 200% or 400% on this page. It has focus indicators and you can get to the nested lists of links for each category, although there are some weird spots where focusing reveals content sometimes, but other times you need to activate the button before content is shown. It’s just a little awkward.

## Testing the Denver Broncos overview page

### Automated scans

There is a tab widget in the sidebar on this page that doesn’t quite get the ARIA roles and attributes correct. There are buttons with `role="tab"` wrapped by `li` elements that also have `role="tab"` (a double whammy, since now there are nested interactive elements), and the contents of the tab widget don’t use the “tabpanel” role. Tabs are hard, what can I say, other than maybe don’t use them.

This page has an unlabeled `select` element, but otherwise, its issues are repeats from the home page and NFL scoreboard page.

### Manual testing

There aren’t any notable new issues on this page. There are still tons of tab stops before the main content, but at least the focus indicators are mostly visible.

## Results

I’ll give ESPN a D. While the most prevalent issues (color contrast, lack of focus indicators, and no alt text) are bad, they’re also fairly easy to fix. There are a handful of interactions that are built inaccessibly, but they’re pretty small, and I would imagine they could be replaced or rebuilt without a huge investment. Because these issues are so easy to detect, it seems clear that accessibility is not a high priority, as even a quick Lighthouse scan (a.k.a. the bare minimum) would catch many of these issues.

Next time, I’ll shift focus away from sports and look at a totally different kind of fandom at, uh, well, Fandom.

{% include 'partials/article-pagination.njk' %}
