---
title: "Dozens of accessibility issues found on The New York Times. One developer tries to understand why. - Writing - Dustin Whisman"
description: "Dozens of accessibility issues found on The New York Times. One developer tries to understand why. This is part 9 of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "Dozens of accessibility issues found on The New York Times. One developer tries to understand why."
layout: default
date: 2024-09-15T00:00:00.000Z
tags:
  - writing
  - accessibility top 100
---

# Dozens of accessibility issues found on The New York Times. One developer tries to understand why.

_This is part 9 of a [series](/writing/accessibility-top-100/) evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at The New York Times. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}

## What was tested

The home page and an article page made the most sense to test, but due to the prevalence of paywalls on the New York Times, those were tested as well. No subscriptions were paid to bypass paywalls—it was mostly a process of trial and error to figure out how to be able to read the whole article.

<figure>
	<img src="/images/accessibility-top-100/nytimes/desktop.png" alt="A composition of screenshots from nytimes.com on desktop including the home page and a paywalled article that does not include any visible text related to the actual article." class="cmp-article__image">
	<figcaption>These were the pages tested on desktop.</figcaption>
</figure>

<figure>
	<img src="/images/accessibility-top-100/nytimes/mobile.png" alt="A composition of screenshots from nytimes.com on mobile including the home page and a paywalled article that includes very little visible text related to the actual article." class="cmp-article__image">
	<figcaption>These were the pages tested on mobile.</figcaption>
</figure>

The New York Times was tested on September 15th, 2024.

## Testing the home page

### Automated scans

There’s a stock ticker on the home page that shows the Dow, S&P 500, and Nasdaq changes, but at least the green color used for positive percentages does not have sufficient contrast with the background. It also changes every few seconds with no mechanism to pause it.

There’s a carousel at the bottom of the Opinion sidebar that is, for some reason, marked up as tabs, and the elements with `role="tab"` include links to opinion articles. Carousels are bad enough, but the choice to use ARIA to incorrectly call them tabs (which are also bad) instead of a list just makes it worse.

There are quite a few SVG icons that don’t have accessible names, but they are also not explicitly treated as decorative by setting `aria-hidden="true"`. The ones that were spot checked were inside elements with `aria-label` attributes, so the impact is likely minimal, since `aria-label` will override any content inside the element when announcing the name. Some SVGs seem to reuse IDs for some of their inner elements, as well, with values like “Shape”, “Group”, “Page-1”, or “Artboard”, which seems like they were exported from a design tool and not optimized.

There are multiple navigation landmarks that don’t have accessible names to distinguish them from each other. Given the context of where each `<nav>` is, though, [names probably aren’t necessary](https://adrianroselli.com/2024/06/maybe-dont-name-that-landmark.html) for them. Two are in the `<header>`, but they’re duplicates of each other (for the sticky nav, presumably), one is in the `<footer>` and one is in the body of the page.

The search button that reveals the search form uses an `aria-controls` attribute that points to the ID of the search form that doesn’t exist in the DOM until the button is clicked. It’s unclear how that would affect screen readers, but given how [inconsistent `aria-controls` is](https://heydonworks.com/article/aria-controls-is-poop/) under the best circumstances, it’s probably best to remove that attribute entirely.

One of the featured articles used a `<video>` element for its thumbnail that autoplays and does not have the `controls` attribute, meaning that it can’t be paused. It is also wrapped in a link, so clicking it in the attempt to pause it would navigate to the article page instead. With reduced motion settings turned on, the article used an image instead of the video, so it at least respects those preferences if they’re already set when the page loads. It would still be nice to be able to pause the video if you want to, though.

Some carousels have buttons that look like dots that are very small (well below the 24px by 24px minimum) to let you pick which “slide” to navigate to, and they don’t have accessible names. They also have redundant `role="button"` and `tabindex="0"` attributes.

### Manual testing

When testing the home page when simulating a mobile device, a modal dialog automatically opened to strongly suggest buying a subscription. In testing whether keyboard focus could escape the modal, tabbing past the close button and link in the modal caused a new page to open in a different tab. That’s not what I expected to happen or what I imagine most users would want to happen. Upon closing the new tab, the modal was closed on the home page, like it had never been there at all.

The main navigation uses a segmented approach where each link is followed by an icon-only button that reveals a mega menu with links for that section of the site. When any part of the link/button combo is hovered via mouse, it reveals the menu, and you can tab to the buttons via keyboard to open the menu. This mostly covers the bases, but the click targets for the buttons are very small, so users who use touch-based controls on large screens would have a hard time accessing those menus.

Keyboard focus indicators are good across the board and the tab order mostly matches the visual order. The one exception is the Opinion sidebar, which is prominently placed on the page, but you need to tab through dozens of other articles to get to it.

The search form is wonderfully simple, with no autocomplete behavior hacked together—it’s just an input and a button inside a form that works equally well for everybody. You love to see it.

Spot checking images shows a roll of the dice for whether an image will have descriptive alt text or not, which implies support for alt text but inconsistent content entry (some contributors may be better about describing images than others).

When zooming in to 200% or 400%, the site’s text and images scale up just fine, but there are a few cases where horizontal lists of links use `overflow: hidden` rather than letting the links wrap. You can still get to them with a keyboard, but it’s not an ideal experience.

## Testing a paywalled article

### Automated scans

On the article page, there’s a secondary nav with related articles that for some reason uses a `<ul>` element with `role="menu"`. Whatever you think `role="menu"` is for, it isn’t that. The `<li>` elements don’t have `role="menuitem"` , but the links they contain do. None of these roles are correct or necessary—a simple unordered list would do just fine.

The paywall that blocks you from reading the article is an `<iframe>` that is contained by an element with `aria-hidden="true"`, meaning that the entire thing is hidden from screen readers. Whoops. Since I was using Windows, I started up Narrator and found that you can read the article with at least that screen reader, but you can’t see the words that are being read. It’s hard to say whether this is intentional (free access to screen reader users) or a bug, but it’s pretty bad either way in terms of equivalent experiences for all users.

There are a handful of elements with ARIA roles that are flagged by IBM Equal Access, but it’s hard to evaluate them with the paywall in place. Suffice it to say that `role="toolbar"` is suspicious for similar reasons as `role="menu"`, and there’s a `<figure>` element with `role="group"`, which is not a valid combination.

### Manual testing

This page gets real weird with keyboard only access. You might expect that focus would be trapped within the paywall banner, but it’s not. You can still tab to any link within the page, but you may or may not be able to see it, violating focus visibility requirements. Scrolling is disabled unless you count moving the paywall banner up and down, so you can’t scroll to reveal whatever element has focus.

## Testing an article after bypassing the paywall

For some reason, simulating a mobile device didn’t trigger the paywall but rather an offer to subscribe that could be minimized (not dismissed outright), allowing me to read the full article. Maybe mobile devices get preferential treatment over desktops? More free articles before you have to pay up? It’s unclear.

### Automated scans

The article itself is lousy with doubleclick ads, all of which have contrast issues and small click targets on buttons. I’ve mostly ignored third-party issues, but they make up enough of the content of the page that it’s worth mentioning here.

The author photos above the bylines are links, but they’re wrapped by an element with `aria-hidden="true"`. I get the logic here, since the authors’ names are linked to the same places, but the other links are still focusable, so it would be better to remove them from the tab order with `tabindex="-1"`.

Those `<figure>` elements with the improper `role="group"` attributes also have `aria-label="media"`, which isn’t exactly helpful and may cause issues with the `<figcaption>` elements that actually describe the figure.

Now that I can see what elements had `role="toolbar"` on them, I can tell that it’s probably not helping much. It’s used to group social media share buttons, and the usage is *technically* fine, but it seems like a lot of extra hassle for little to no benefit.

There are a fair amount of form control labeling issues, such as multiple labels applying to the same input or `for` attributes that don’t match any `id` attributes of form controls. This could be the same sort of issue as the aforementioned `aria-controls` situation, where those elements may not exist under some conditions. These elements that were flagged appear to be invisible or offscreen, so they’re probably in some modal that isn’t active.

### Manual testing

Lo and behold, keyboard access actually works when the paywall isn’t there. The many ads get annoying as you tab through the page, but focus outlines are all visible and the tab order makes sense. The button to read the article out loud didn’t work when the paywall was up, but it did when the paywall was gone, so there must be some JavaScript to disable that button’s functionality even though it is still focusable.

Zooming in works about the same as on the home page, with just a few horizontal lists of links getting truncated unless you focus on them with the keyboard.

At some point when I was testing, I was presented with a CAPTCHA (already bad) that required dragging movements to solve (even worse). I misunderstood the point of the CAPTCHA, ended up solving it wrong, and got blocked from accessing the site anymore, at least in the incognito session I was in.

When you disable JavaScript, a portion of the article is rendered, and then a message cuts it off that says, “We are having trouble retrieving the article content. Please enable JavaScript in your browser settings.” Curious, seeing how they had no trouble retrieving the first few paragraphs, the featured image, the byline, and all the social media links. Perhaps the message could be updated to “We are having trouble monetizing this article. Please enable JavaScript in your browser settings.” Accuracy is so important in journalism, you know?

## Results

If it were just the home page, I’d probably give the New York Times a B for accessibility. There were a few issues here and there, but they weren’t critical blockers, and it’s clear that there are people who care and put effort into accessibility on the site.

However, the paywall, the CAPTCHA, and the bizarre misuses of ARIA on the article page knock it down to a C- for me. The business model of blocking readers who aren’t subscribed is valid, even if I personally find it annoying, but the implementation leaves a lot to be desired.

Next time, I’ll be seeing if I can find an answer to “How accessible is Quora?”

{% include 'partials/article-pagination.njk' %}
