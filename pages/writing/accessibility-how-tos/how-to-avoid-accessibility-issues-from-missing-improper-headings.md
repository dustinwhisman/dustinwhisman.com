---
title: "How to avoid accessibility issues from missing/improper headings - Accessibility how-tos - Writing - Dustin Whisman"
description: "Every page should have, at max, one h1 heading. Don't skip heading levels, and don't use heading tags (h1-h6) for purely visual reasons."
articleTitle: "How to avoid accessibility issues from missing/improper headings"
layout: default
date: 2024-05-23T00:00:00.000Z
tags:
  - writing
  - accessibility how-tos
---

# How to avoid accessibility issues from missing/improper headings

{% include 'partials/published-date.njk' %}

Most screen readers have a way to navigate between headings on a page, which is helpful for skimming as well as skipping to sections the user is interested in. If a page has few or no headings, that utility is lost, and the structure of the page is less clear. If the heading levels are out of order, such as skipping from `h1` to `h3`, then to `h2`, then the structure gets confusing and makes in-page navigation more difficult.

Every page should have only one `h1` heading, and ideally it should match or at least be close to the page’s [`title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title). This is important for orientation—letting the user know where they are on the site.

The other heading levels should be used as necessary to logically group content. There can be many `h2` headings, each of which can have many `h3` headings, and so on, all the way to `h6`. You _may_ go further using [`aria-level`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-level), but [you probably shouldn’t](https://adrianroselli.com/2024/05/level-setting-heading-levels.html), and if you find yourself going past heading level 6, you probably have a content problem.

```html
<!-- indented to visualize the structure, even though there's no nesting -->
<h1>A lazy taxonomy of animals</h1>
	<h2>Mammals</h2>
		<h3>Mammals you can pet</h3>
		<h3>Mammals you absolutely can't pet</h3>
	<h2>Birds<h2>
		<h3>Flightless birds</h3>
			<h4>Penguins</h4>
			<h4>Ostriches and emus</h4>
		<h3>Normal birds</h3>
```

Never use a heading tag just for its visual appearance. If it doesn’t structurally make sense to use a heading tag, use CSS to style the element instead. On the other hand, if you are using the visual appearance of text to imply structure within a page, then you probably _should_ use a heading tag for that text.

{% include 'partials/article-pagination.njk' %}
