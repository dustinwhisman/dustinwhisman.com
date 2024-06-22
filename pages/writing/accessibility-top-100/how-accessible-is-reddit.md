---
title: "How accessible is reddit? - Writing - Dustin Whisman"
description: "How accessible is reddit? This is part 6 of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "How accessible is reddit?"
layout: default
date: 2024-06-22T00:00:00.000Z
tags:
  - writing
  - accessibility top 100
---

# How accessible is reddit?

_This is part 6 of a [series](/writing/accessibility-top-100/) evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at reddit. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}

## What I tested

For reddit, I decided to test the [home page](https://www.reddit.com/) and the subreddit page for [/r/todayilearned](https://www.reddit.com/r/todayilearned/), including the [page for the top post](https://www.reddit.com/r/todayilearned/comments/1dluhdg/til_there_are_over_1000_homes_in_edinburgh/) at the time.

<figure>
	<picture>
		<source srcset="/images/accessibility-top-100/reddit/desktop-pages-h.png" media="(min-width: 50rem)">
		<img src="/images/accessibility-top-100/reddit/desktop-pages-v.png" alt="A composition of screenshots from the desktop version of reddit.com, showing the home page, a subreddit page, and a post page." class="cmp-article__image">
	</picture>
	<figcaption>These are the pages that were tested on desktop.</figcaption>
</figure>

As seems to always be the case, different markup is served on desktop compared to mobile, despite very few visual differences. It mostly seems like an excuse to prompt users to use the mobile app instead, which I bet feels great for reddit’s web developers.

<figure>
	<img src="/images/accessibility-top-100/reddit/mobile-pages.png" alt="A composition of screenshots from the desktop version of reddit.com, showing the home page, a subreddit page, and a post page." class="cmp-article__image">
	<figcaption>These are the pages that were tested on mobile.</figcaption>
</figure>

I evaluated reddit on June 22nd, 2024.

## Testing the home page

Before I get into it, I’ll plug a bookmarklet that I put together to add visual regressions to pages that have accessibility issues or HTML anti-patterns. I’m calling it [Visua11yze](https://codepen.io/dustin-jw/pen/jOoMqQY), and you can check it out if you want, even though it’s very much a prototype at this point. Anyway, reddit has a Content Security Policy (CSP) that prevents users from loading their own scripts or stylesheets this way, which is an accessibility violation of its own (people need to be able to fix your broken stuff if possible). If I get around to turning Visua11yze into a browser extension, that might bypass the CSP, but still.

### Automated scans

#### Desktop

It turns out that reddit uses a lot of custom elements, like `<click-card>`, that make it somewhat difficult to evaluate for accessibility. axe DevTools flagged `aria-label` as invalid for those elements, which might be true, depending on what element they extend. Is it a spicy `<div>`? Then yes, it’s invalid, but if it’s a spicy `<a>`, then it’s fine. Inspecting one of them and looking at the accessibility tree reveals that the role is “generic”, which does mean that `aria-label` is invalid here. There’s a ton of invalid ARIA usage here that I don’t have time to get into—just trust me, it’s a lot.

The custom elements also pose problems for developers to figure out how to use them without introducing accessibility issues or invalid markup. For example, the `<shreddit-gallery-carousel>` custom element at the top of the page contains a `<ul>` that has a `<slot>` as a direct child, which contains one `<li>` and several `<faceplace-tracker>` custom elements that I’m not going to dig into. The basic structure is like so:

```html
<shreddit-gallery-carousel>
	<div>
		<ul>
			<slot>
				<faceplate-tracker>...</faceplate-tracker>
				<li>...</li>
				<faceplate-tracker>...</faceplate-tracker>
				<faceplate-tracker>...</faceplate-tracker>
				<faceplate-tracker>...</faceplate-tracker>
				<faceplate-tracker>...</faceplate-tracker>
				<faceplate-tracker>...</faceplate-tracker>
			</slot>
		</ul>
	</div>
</shreddit-gallery-carousel>
```

However [`<ul>` elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul#technical_summary) can only contain `<li>`, `<script>` , or `<template>` elements as direct children, and [`<slot>` elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot#technical_summary) are only permitted in parent elements that allow [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content). When in doubt, check the Technical Summary section on MDN pages! There’s a fair amount of nuance here that was not considered well enough when building this gallery/carousel. The simple fix for this would be to move the `<slot>` so it wraps the `<ul>` and to make sure that the `<faceplate-tracker>` custom element extends the [`HTMLLIElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLIElement) instead of the generic [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).

There’s also some weird stuff going on in some post previews. Here’s an example of a post that includes a table and multiple links.

<figure>
	<img src="/images/accessibility-top-100/reddit/unclickable-links.png" alt="A screenshot of a reddit post showing the box score from a hockey game, with several visible links to the NHL website as well as each team's websites." class="cmp-article__image">
	<figcaption>Quiz: which of these interactive elements can you actually interact with?</figcaption>
</figure>

A few things are happening here:

- The post preview is covered by an absolutely positioned link to the post’s page, making the inner links unclickable
- The links that you can’t click are wrapped in `<object>` elements with `role="none"` (not allowed)
- You can tab to the links, which reveals that there’s a bunch of content that’s hidden unless you tab to it (a rare case of the keyboard-only experience being more accessible)

When I actually click on the preview to go to the post page, the `<object>` wrapper elements go away, so I’m not sure what’s going on behind the scenes or why the post is altered for the preview. I understand why reddit would want users to be able to click anywhere to see the post in full, but it’s bad form when those posts have links that look like they can be clicked. Maybe just let the link to the post be the link to post without any trickery to obscure the rest of the content.

We also have a fun double whammy of bad button markup that nests a `<button>` that would otherwise be valid inside a `<span>` with `role="button"` that ruins the whole thing.

```html
<!-- this role attribute introduces two failures at once, how exciting -->
<span role="button">
	<button aria-label="Previous Page">
		<!-- some unnecessary nesting for good measure -->
		<span>
			<span>
				<svg>...</svg>
			</span>
		</span>
	</button>
</span>
```

There are a few landmark region issues as well, including an `<aside>` within an `<aside>`, elements not being contained by landmarks, and repeated landmarks not having accessible names. There are also links and buttons that don’t have accessible names, and labels that don’t have text.

The strangest issue is probably the login form, though. The `<form>` element has `aria-hidden="true"` , but it contains focusable elements (you know, like inputs and buttons because it’s a form). Now, it is a form that appears in a modal dialog, so you’d think that maybe `aria-hidden` gets removed once it’s visible. But no, as it turns out, it remains hidden and completely separate inputs are used in a non-form that gets used instead of the one that’s hidden. I don’t get it, but it’s certainly not a *good* pattern.

#### Mobile

The mobile version of the page has fewer automatically detectable issues, probably because the gallery/carousel is not used on mobile, but most of the issues on desktop are still issues here. Nothing else new or interesting got flagged for mobile.

### Manual testing

#### Desktop

Keyboard-only interactions are actually decent overall. The focus indicators are fairly thick and have good contrast with the background color and surrounding elements. Whenever I opened a modal dialog or other type of popover/menu, hitting `Esc` would close it and return focus to the button that opened it. Are some of those buttons secretly actually links? Yes. You can’t win ‘em all.

On the less-than-stellar side, the sidebar navigation comes after the main content of the page in the DOM, and when you get far enough down into the main content, more stuff gets loaded into it, meaning that unless you found the “Skip to navigation” link early on, you’ll never get that sidebar (or the other one, for that matter). Links to get to those sidebars do exist, but they’re not exactly early in the focus order, coming after the gallery/carousel thing. Moving those skip links to just after the “Skip to main content” link would help, as would putting the sidebars before the main content in the DOM. It would be easy enough to style the page to look the same with CSS.

I did also find an issue where a focused element could move offscreen, failing [Focus Visible](https://www.w3.org/WAI/WCAG22/quickref/#focus-visible). This can happen in the sidebar when the “See more” button under Topics gets activated. It shows more topics, which pushes the still-focused button offscreen. Once you tab or shift-tab again, you can see what has focus, but I think it still counts as a failure. A small failure, but a failure, nevertheless.

Automated testing didn’t flag issues for alt text on images, but I looked at the ones in the gallery/carousel and found that their alt text was a duplication of other visible text, so not great. The same happens for images in post preview, which end up using the same text as the post title.

By default, videos start autoplaying on mute as you scroll down the page, and that doesn’t seem to change if you have reduced motion preferences turned on. Closed captions for videos are hit or miss, but that’s probably to be expected for user generated content. A lot of posts are TikTok videos that have open captions, but some videos just don’t have any captions. There does not seem to be any support for audio descriptions or transcripts.

The search input is wrapped by a `<label>` element, but there isn’t any actual text, so the input is effectively unlabeled, and there’s no attempt to wire up the search suggestions in an accessible way. If you’re using a screen reader, you get an input where you type and press `Enter`, no suggestions for you. Also, the submit button is hidden and has no text or other approach to give it an accessible name.

#### Mobile

Keyboard focus starts in the annoying pop up trying to get you to use the app instead of the website. When you close it, focus ends up at the beginning of the page with the “Skip to main content” link, so good job there (sincere).

It seems like it should be easier to get to the sidebar content now, which is in a hamburger menu on mobile, but that’s not the case. It’s easy to _open_ the menu, but it’s still at the end of the DOM, so you have to tab through everything else to get to it, which is sort of impossible, so you instead have to shift-tab back to the bottom of the menu. Super well thought out, great job (sarcastic).

At least on mobile, the videos don’t autoplay as you scroll.

### Page weight and resource breakdown

#### Desktop

The home page on desktop initially weighs 6 MB, which breaks down as follows for the major resource categories:

- 656 kB HTML
- 56.9 kB CSS
- 3 MB JS
- 30.9 kB fonts
- 670 kB images
- 34.3 kB media

#### Mobile

The home page on mobile initially weighs 5.3 MB, which breaks down as follows for the major resource categories:

- 619 kB HTML
- 56.4 kB CSS
- 2.7 MB JS
- 21.5 kB fonts
- 309 kB images
- 30.3 kB media

## Testing a subreddit page

### Automated scans

The subreddit page is structured nearly identically to the home page, with some minor exceptions. Instead of the gallery/carousel component, the subreddit page has a sort of banner with an image, the name of the subreddit, and some buttons for creating posts or joining the subreddit. The sidebar on the right has different content, which in this case is the subreddit description and rules for members.

The only new issue flagged on this is that a link within a paragraph in the sidebar only uses color to indicate that it’s a link. Everything else is more or less the same as the home page, minus the gallery/carousel issues that aren’t present here.

### Manual testing

Nothing here is different from the home page. Moving on!

### Page weight and resource breakdown

#### Desktop

The subreddit page on desktop initially weighs 3.6 MB, which breaks down as follows for the major resource categories:

- 560 kB HTML
- 56.9 kB CSS
- 1.8 MB JS
- 30.9 kB fonts
- 179 kB images

#### Mobile

The subreddit page on mobile initially weighs 3.3 MB, which breaks down as follows for the major resource categories:

- 584 kB HTML
- 56.4 kB CSS
- 1.5 MB JS
- 21.5 kB fonts
- 178 kB images

## Testing a post page with comments

### Automated scans

With the addition of a comments section, we get some new issues. One repeated issue is with nested interactive elements, namely links inside of `<summary>` elements. These are the disclosure widgets for each user that leaves a comment, so you can click whitespace around the avatar, username, or timestamp to open/close the details, but clicking any of those other links will trigger navigation. What’s weird is that they have a different pattern for basically the same behavior that’s wired up correctly (`<button>` with `aria-expanded`) that they could have used instead.

Surprisingly, those were the only new issues automatically detected with the comments section. Other than that, there were just more elements not in landmark regions, mostly because the sidebar on this page had more stuff in it. If it sounds like I’m painting a rosy picture, remember all the ARIA misuse that I’m glossing over—just a whole bunch of misapplied roles and attributes. Those have been there the whole time, lurking in the background along with duplicate IDs on elements and minor things like that.

### Manual testing

The nested interactive elements mentioned earlier do indeed cause keyboard accessibility issues. When you’re focused on the `<summary>` element, there is no focus indicator, and then you can tab to the inner links that do get visual focus indicators. The focus indicators do seem worse in the comments section, though. They’re less consistent and I suspect there’s some styling issues causing them to be less thick—things like `overflow: hidden` can do that to outlines and box shadows.

On these pages, there is at least a theoretical end to the amount of content that will get loaded as you go further down the page, so you’ll eventually get to the sidebars, but it’s still basically the same issue as on the other pages.

Nothing else is really noteworthy here. It turns out reddit is pretty same-y across the board, which is honestly kind of a relief for me compared to something like Amazon.

### Page weight and resource breakdown

#### Desktop

The comments page on desktop initially weighs 5.8 MB, which breaks down as follows for the major resource categories:

- 515 kB HTML
- 56.9 kB CSS
- 3.3 MB JS
- 30.9 kB fonts
- 297 kB images

#### Mobile

The comments page on mobile initially weighs 4.9 MB, which breaks down as follows for the major resource categories:

- 394 kB HTML
- 56.4 kB CSS
- 3 MB JS
- 21.5 kB fonts
- 114 kB images

## Results

While reddit certainly has room for improvement, they’re far from the worst I’ve seen, and I think the issues that I did find would be fairly easy to address without a huge amount of effort. There are some busted components that could use fixing up, and the page structure could be updated to fix the landmark and focus order issues, but since reddit is as consistent as it is from page to page, those few changes would go a long way. To fix everything I found, it would probably take weeks or months rather than something like YouTube or Amazon, where it would probably take years.

I’ll give reddit a C, but with a little note that says, “I know you can do better.” Next time, I'll be taking a look at Instagram.

{% include 'partials/article-pagination.njk' %}
