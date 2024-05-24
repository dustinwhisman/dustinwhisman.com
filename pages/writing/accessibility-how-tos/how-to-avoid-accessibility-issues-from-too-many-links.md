---
title: "How to avoid accessibility issues from too many links - Accessibility how-tos - Writing - Dustin Whisman"
description: "Only include the links that are most helpful or necessary, avoid redundant links, and if needed, add skip links or table of contents links to help users bypass sections."
articleTitle: "How to avoid accessibility issues from too many links"
layout: default
date: 2024-05-24T00:00:00.000Z
tags:
  - writing
  - accessibility how-tos
---

# How to avoid accessibility issues from too many links

{% include 'partials/published-date.njk' %}

Screen reader users and keyboard-only users often navigate by tabbing through the page, and if there’s a huge amount of links, that means a huge amount of tabbing. To help alleviate the issue, you can cut down on the number of links included in content by only adding links when it’s most helpful or necessary. You can also limit navigation links to high-level index links that lead to pages with more links that narrow down what users might be trying to find.

If your pages are long and structured enough, you can even add “skip” links to bypass sections, or include table of contents links near the top of the page, or do some combination of the two. Note that this is solving the problem of too many links by adding more links—only go down this road if there’s a clear need for them.

```html
<!-- overkill for simple pages, but maybe useful for a long Wikipedia article -->
<ul id="table-of-contents" tabindex="-1" aria-label="Table of contents">
	<li><a href="#section-one">Section One</a></li>
	<li><a href="#section-two">Section Two</a></li>
	<li><a href="#section-three">Section Three</a></li>
</ul>

<!-- tabindex="-1" will let visual focus indicators be shown -->
<section id="section-one" tabindex="-1" aria-labelledby="section-one-heading">
	<h2 id="section-one-heading">Section One</h2>
	<!-- content -->
	<a href="#table-of-contents" class="cmp-skip-link">Table of contents</a>
</section>

<section id="section-two" tabindex="-1" aria-labelledby="section-two-heading">
	<h2 id="section-two-heading">Section Two</h2>
	<!-- content -->
	<a href="#table-of-contents" class="cmp-skip-link">Table of contents</a>
</section>

<section id="section-three" tabindex="-1" aria-labelledby="section-three-heading">
	<h2 id="section-three-heading">Section Three</h2>
	<!-- content -->
	<a href="#table-of-contents" class="cmp-skip-link">Table of contents</a>
</section>
```

Redundant links can also contribute to the feeling that there are too many links. For example, if you want users to be able to click on images to get to the same place that nearby text links lead to, you might wrap those images with links. While this helps some users by providing larger tap/click targets, it can be a hassle for screen reader and keyboard-only users, who have to tab through both links each time the pattern occurs.

The way to fix this will depend on the specifics of the UI. If the images are purely decorative (they’re probably not), you could wrap them with links that are hidden from screen readers and removed from the tab order. This will make it as though the link and image don’t exist for screen readers, while keyboard-only users will tab right past the link.

```html
<a href="/cats" aria-hidden="true" tabindex="-1">
	<img src="/path/to/image.jpg" alt="">
</a>
<a href="/cats">Cats</a>
```

If the image is not decorative, then hiding it from screen readers isn’t a valid approach. In this case, you’ll want to hide the link but not the image, which you can do by moving the link after the image and using CSS to make the link’s click target area cover the image.

```html
<style>
	.util-position-relative {
		position: relative;
	}

	.cmp-image-link {
		content: '';
		position: absolute;
		inset: 0;
	}
</style>

<!-- a screen reader will announce the image, but not the link -->
<div class="util-position-relative">
	<img src="/path/to/image.jpg" alt="A cat lying on its back pretending to want belly rubs, but it's a trap.">
	<a href="/cats" class="cmp-image-link" aria-hidden="true" tabindex="-1"></a>
</div>
<a href="/cats">Cats</a>
```

Depending on the placement of the visible text link, you could even change that link’s click target area with CSS and avoid needing the redundant link in the first place.

{% include 'partials/article-pagination.njk' %}
