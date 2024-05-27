---
title: 'How to avoid accessibility issues from missing "skip" links - Accessibility how-tos - Writing - Dustin Whisman'
description: "Add links to bypass blocks of repeated content. Usually these are visually hidden until focused, which requires some CSS trickery, but otherwise they're pretty simple to implement."
articleTitle: 'How to avoid accessibility issues from missing "skip" links'
layout: default
date: 2024-05-27T00:00:00.000Z
tags:
  - writing
  - accessibility how-tos
---

# How to avoid accessibility issues from missing "skip" links

{% include 'partials/published-date.njk' %}

A “skip” link lets users skip past repeated content to get to where they want to go faster. Usually, these are visually hidden until they receive keyboard focus, and once they’re activated, the user is taken to the specified section of the page (usually the main content area). Without them, users are forced to tab through every single link in the navigation before getting to the main content of the page, which gets increasingly tedious and frustrating for each new page that’s visited.

```html
<header>
	<a href="#main" class="cmp-skip-link">Skip to main content</a>
	<!-- A nav element with tons of links for site navigation -->
</header>
<main id="main" tabindex="-1">
	<!-- The page's main content -->
</main>
```

Note that visually hiding the link should not be done with `display: none` or `visibility: hidden`, since both of those will remove the link from the accessibility tree and users won’t be able to tab to them. Instead, use a combination of properties to hide the link while still making it keyboard accessible.

```css
.cmp-skip-link:not(:focus) {
	position: absolute;
	height: 1px;
	width: 1px;
	clip-path: inset(50%);
	overflow: hidden;
	white-space: nowrap;
}
```

These are pretty simple to implement, but there are a few things worth mentioning. It’s best to link to an element on the page rather than using a button and JavaScript, since the browser handles focus management for you. It’s also useful to set `tabindex="-1"` on the target element so that visual focus indicators will be shown when focus changes.

If the element you’re linking to is a generic `div`, you may want to consider using [`section`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) with an [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) or [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) instead so that when it receives focus, screen readers are able to announce the name of the section.

While “skip” links are mostly used to bypass headers, they can also be used to [bypass any blocks of content that are repeated across multiple pages](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&currentsidebar=%23col_overview#bypass-blocks). If your page is organized such that those repeated blocks are contained within landmarks, additional “skip” links may not be necessary, but they will still be useful to keyboard-only users who aren’t using screen readers.

{% include 'partials/article-pagination.njk' %}
