---
title: "How to avoid accessibility issues with ambiguous links and buttons - Accessibility how-tos - Writing - Dustin Whisman"
description: "Give links and buttons names, either through text content, aria-label, or aria-labelledby, and make sure those names make sense out of context."
articleTitle: "How to avoid accessibility issues with ambiguous links and buttons"
layout: default
date: 2024-05-18T00:00:00.000Z
tags:
  - writing
  - accessibility how-tos
---

# How to avoid accessibility issues with ambiguous links and buttons

{% include 'partials/published-date.njk' %}

There are a few reasons a link or button may be ambiguous to users. They might:

- not have a name (no text)
- be generally vague or rely on visual context clues
- be redundant with other links (”read more”)
- be overloaded with unhelpful text

It’s fairly easy to fix the issue when there is no name—add one! The main culprits are usually icon-only links or buttons, which are bad enough for people who can see them, but worse for people who can’t. If it’s essential that there be no visual text for the link (it isn’t), it’s best to use [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label), or if there’s visible text elsewhere that describes it, [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby). You could also add a `title` attribute so that users who can hover over the link or button can see a tooltip with the text, but it would be better to redesign it to have an icon plus text.

For vague links or buttons that only make sense with visual context, it’s best to reword them so their purpose is clear without the additional context. The same goes for “read more” links—rephrasing them so they’re more specific helps, but it may be better to drop them entirely and link from somewhere else that already has context for whatever you’re linking to.

```html
<!-- don't do this -->
<article>
	<img src="/path/to/image.jpg" alt="The Weezer logo surrounded by fallen leaves and pints of German beer.">
	<h2>Weeztoberfest</h2>
	<p>
		Weezer will be playing the Blue Album across the country every night in October!
	</p>
	<p><a href="/weeztoberfest">Read more</a></p>
</article>

<!-- do this -->
<article>
	<img src="/path/to/image.jpg" alt="The Weezer logo surrounded by fallen leaves and pints of German beer.">
	<h2><a href="/weeztoberfest">Weeztoberfest</a></h2>
	<p>
		Weezer will be playing the Blue Album across the country every night in October!
	</p>
</article>
```

Links or buttons that are overloaded with unhelpful text are sort of an inverse of the icon-only links. In this case, they can be links that have icons and text such that the accessible name is the icon’s alt text combined with the visible text. The alt text could be verbose or irrelevant for the link, in which case it would be better to set `alt=""` if it’s an image or [`role="presentation"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/presentation_role) or [`aria-hidden="true"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden) if it’s an inline SVG.

```html
<!-- this button's accessible name would be "Hamburger menu icon Menu" -->
<button aria-expanded="false">
	<span>
		<svg>
			<title>Hamburger menu icon</title>
			<use href="#hamburger" />
		</svg>
	<span>
	Menu
</button>

<!-- this button's accessible name would be "Menu" -->
<button aria-expanded="false">
	<span aria-hidden="true">
		<svg>
			<title>Hamburger menu icon</title>
			<use href="#hamburger" />
		</svg>
	<span>
	Menu
</button>
```

Automated tools can identify empty links and _might_ be able to detect links that have the same name, but manual testing is necessary for the more nuanced cases. By tabbing through the page and inspecting each link or button’s accessible name without any surrounding context, you should be able to find and fix most of these issues.

{% include 'partials/article-pagination.njk' %}
